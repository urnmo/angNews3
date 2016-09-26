let app = angular.module("newsApp", []);

app.component('articles', {
    controller: "NewsItemController",
    templateUrl: 'components/article.html',
    bindings: {
        readable: '<',
    },
});

//create controller
app.controller("NewsController", function ($scope, NewsGetter) {
    $scope.news = NewsGetter.getNews();
    $scope.times = function () {
        $scope.news = NewsGetter.getNYT()
    }
    console.log('controlly starter')
});

app.controller("NewsItemController", function ($scope, NewsGetter) {
    $scope.addToStarred = function (article) {
        console.log("hay!");
    }

    $scope.hide = function (x) {
        x.hide = true;
        console.log("sup");
    }

});

//create a factory that connects to the api
app.factory("NewsGetter", function ($http) {
    //create empty array for news objects
    let newsy = [];
    $http({
        method: 'GET',
        url: "http://puzzlegram.herokuapp.com/news",
    }).then(function (response) {
        angular.copy(response.data.news, newsy);
        console.log(response);
        for (let i = 0; i < newsy.length; i++) {
            newsy[i].hide = false;

        }
    });
    return {
        getNYT: function () {
            for (let i = 0; i < newsy.length; i++) {
                if (newsy[i].publisher.name === "New York Times") {
                    newsy[i].hide = false;
                } else {
                    newsy[i].hide = true;
                }
            }
        },
       
        getNews: function () {
            // console.log(newsy);
            return newsy;
        },

    };
});
