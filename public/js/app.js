// public/js/app.js

// create the module and name it papsb
var app = angular.module('papsb', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toastr']);

// configure our routes

// create the controller and inject Angular's $scope
app.controller('mainController', ['$scope', function($scope) {

  // create a message to display in our view
  $scope.message = 'Everyone come and see how good id look';
  $scope.sidebar = true;
}]);

app.controller('aboutController', function ($scope) {
  $scope.message = 'This is about page!';
});

app.controller('contactController', function ($scope) {
  $scope.message = 'Contact us!!';
});

app.directive('appLogin', function () {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      // console.log('directive app-login');
      el.bind('mouseup', function () {
        console.log('done');
        $('#papsbLogin').modal('toggle');
      })
    }
    //templateUrl: 'views/login.html'
    // template: 'Login'
  }
})
