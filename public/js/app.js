// public/js/app.js

// create the module and name it kuntauApp
var kuntauApp = angular.module('kuntauApp', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

// configure our routes
kuntauApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // $locationProvider.html5Mode(true);
  // for any unmatched url, redirect here
  $urlRouterProvider.otherwise('/home');

  $stateProvider

    // route for the home page
    .state('home', {
      url         : '/home',
      templateUrl : 'views/home.html'
    })

      .state('home.index', {
        url         : '/index',
        templateUrl : 'views/home.index.html'
      })

      .state('home.message1', {
        url         : '/message1',
        templateUrl : 'views/home.message1.html'
      })

      .state('home.message2', {
        url         : '/message2',
        templateUrl : 'views/home.message2.html',
        controller  : function ($scope) {
          $scope.names = ["nizam", "hassan", "adam", "burhan"];
        }
      })

    // route for about
    .state('about', {
      url         : '/about',
      templateUrl : 'views/about.html',
      controller  : 'aboutController'
    })

    .state('contact', {
      url         : '/contact',
      templateUrl : 'views/contact.html',
      controller  : 'contactController'
    })

    .state('login', {
      url         : '/login',
      templateUrl : 'views/login.html',
      // controller  : 'LoginCtrl'
      controller  : function ($scope) {
        $('#papsbLogin').modal('toggle');
      }
    });

});

// create the controller and inject Angular's $scope
kuntauApp.controller('mainController', ['$scope', function($scope) {

  // create a message to display in our view
  $scope.message = 'Everyone come and see how good id look';
  $scope.sidebar = true;
}]);

kuntauApp.controller('aboutController', function ($scope) {
  $scope.message = 'This is about page!';
});

kuntauApp.controller('contactController', function ($scope) {
  $scope.message = 'Contact us!!';
});

kuntauApp.directive('appLogin', function () {
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
