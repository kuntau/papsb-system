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
  // monitor `state change`
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    //event.preventDefault();
    //console.log(event + ' state is changing! fromState:' + fromState + ' toState:' + toParams);
    //console.log(JSON.stringify(toState, null, 4));
    console.log(toState.url);
  })
}

function papsbRoute ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/login'); // for any unmatched url, redirect here

  $stateProvider
    // route for the workshop page
    .state('workshop', {
      url         : '/workshop',
      templateUrl : 'views/workshop.html',
      title       : 'Workshop Dashboard',
      onEnter     : function () {
        shell.sidebarStatus = '';
        shell.workshopStatus = true;
      },
      onExit     : function () {
        shell.sidebarStatus = 'sidebar-hidden';
        shell.workshopStatus = false;
      }
    })

    //.state('workshop.index', {
    //  url         : '/index',
    //  templateUrl : 'views/workshop.html'
    //})

    .state('workshop.message1', {
      url         : '/message1',
      templateUrl : 'views/workshop.message1.html',
      title       : 'Message 1',
      controller  : function ($scope, toastr) {
        $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
        toastr.success('The message from message 1: ' + $scope.names[2]);
      }
    })

    .state('workshop.message2', {
      url         : '/message2',
      templateUrl : 'views/workshop.message2.html',
      title       : 'Message 2',
      controller  : function ($scope, toastr) {
        $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
        toastr.info('The message from message 2: ' + $scope.names[0]);
      }
    })

    // route for about
    .state('about', {
      url         : '/about',
      templateUrl : 'views/about.html',
      controller  : 'aboutController as vm',
      title       : 'About Us'
    })

    .state('contact', {
      url         : '/contact',
      templateUrl : 'views/contact.html',
      controller  : 'contactController as vm',
      title       : 'Contact Us',
      resolve     : {
        delay: function ($q, $timeout) {
          var delay = $q.defer();
          $timeout(delay.resolve, 100);
          return delay.promise;
        }
      }
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
