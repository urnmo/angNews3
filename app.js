let app = angular.module("newsApp", []);

app.component('articles', {
    templateUrl: 'components/article.html',
    bindings: {
        readable: '<',
    },
});

//create controller
app.controller("NewsController", function($scope, NewsGetter){
    $scope.news = NewsGetter.getNews();

$scope.addToStarred = function(){
    console.log('working?');
//function needs to add articles to the starred group
//where must starred group exist? a component


};
});

//create a factory that connects to the api
app.factory("NewsGetter", function ($http){
//create empty array for news objects
let newsy = [];
$http({
    method: 'GET',
    url: "http://puzzlegram.herokuapp.com/news",
}).then(function (response){
    angular.copy(response.data.news, newsy);
    console.log(response);
});
    return{
        getNews: function(){
            console.log(newsy);
            return newsy;
        }
    };
});
