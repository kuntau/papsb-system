/**
 * Created by kuntau on 8/11/14.
 */

// manage all routes in one file
angular.module('papsb')
  .run(['$rootScope', '$state', '$stateParams', papsbInit])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', papsbRoute]);

function papsbInit ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}

function papsbRoute ($stateProvider, $urlRouterProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  // for any unmatched url, redirect here
  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider

    // route for the dashboard page
    .state('dashboard', {
      url         : '/dashboard',
      templateUrl : 'views/dashboard.html',
      title       : 'Workshop Dashboard'
    })

    //.state('dashboard.index', {
    //  url         : '/index',
    //  templateUrl : 'views/dashboard.html'
    //})

    .state('dashboard.message1', {
      url         : '/message1',
      templateUrl : 'views/dashboard.message1.html'
    })

    .state('dashboard.message2', {
      url         : '/message2',
      templateUrl : 'views/dashboard.message2.html',
      controller  : function ($scope, toastr) {
        toastr.info('This is the info from toastr');
        $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
      }
    })

    // route for about
    .state('about', {
      url         : '/about',
      templateUrl : 'views/about.html',
      controller  : 'aboutController',
      title       : 'About Us'
    })

    .state('contact', {
      url         : '/contact',
      templateUrl : 'views/contact.html',
      controller  : 'contactController',
      title       : 'Contact Us'
    })

    .state('login', {
      url         : '/login',
      templateUrl : 'views/login.html',
      // controller  : 'LoginCtrl'
      controller  : function ($scope) {
        $('#papsbLogin').modal('toggle');
      }
    });
};
