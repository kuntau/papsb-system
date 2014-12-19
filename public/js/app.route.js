/**
 * Created by kuntau on 8/11/14.
 */
'use strict';

// manage all routes in one file
angular.module('papsb')
  .run(['$rootScope', '$state', '$stateParams', 'toastr', papsbInit])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', papsbRoute]);

function papsbInit ($rootScope, $state, $stateParams, toastr) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  // monitor `state change`
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    //event.preventDefault();
    toastr.info(fromState.url + ' >> ' + toState.url + ': ' + toParams.page, 'State Changed!');
  })
}

function papsbRoute ($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/workshop'); // for any unmatched url, redirect here

  $stateProvider
    // route for the workshop page
    .state('workshop', {
      url         : '/workshop',
      templateUrl : 'views/workshop.html',
      title       : 'Workshop Dashboard',
      controller  : 'WorkshopCtrl as vm',
      onEnter     : function ($rootScope) {
        // hacky solution but seems to work well
        if (!shell)
          $location.path('/')
        shell.sidebarStatus = '';
        shell.workshopStatus = true;
        shell.message = 'HIJAcked!! 1337';
      },
      onExit     : function () {
        shell.sidebarStatus = 'sidebar-hidden';
        shell.workshopStatus = false;
      }
    })

    .state('workshop.message1', {
      url         : '/:page',
      templateUrl : 'views/workshop.message1.html',
      title       : 'Message 1',
      controller  : function ($scope, $stateParams, toastr, getTitle) {
        $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
        $scope.title = getTitle.title;
        $scope.page = $stateParams.page;

        var massive = [];

        for (var i = 10 - 1; i >= 0; i--) {
          var word = 'random useless ' + $scope.page + ' and the couting: ' + i;
          // toastr.warning(word);
          massive.push(word)
        }
        $scope.massive = massive;
      },
      resolve     : {
        getTitle : function ($stateParams) {
                    return { title: $stateParams.page }
        }},
      data        : {
        titlex: 'haish'
      }
    })

    // .state('workshop.message1', {
    //   url         : '/message1',
    //   templateUrl : 'views/workshop.message1.html',
    //   title       : 'Message 1',
    //   controller  : function ($scope, toastr) {
    //     $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
    //     toastr.success('The message from message 1: ' + $scope.names[2]);
    //   }
    // })
    //
    .state('workshop.message2', {
      url         : '/aum/message2',
      templateUrl : 'views/workshop.message2.html',
      title       : 'Message 2',
      controller  : function ($scope, toastr) {
        $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
        // toastr.warning('The message from message 2: ' + $scope.names[0]);
      }
    })

    // route for about
    .state('about', {
      url         : '/about',
      templateUrl : 'views/about.html',
      controller  : 'AboutCtrl as vm',
      title       : 'About Us'
    })

    .state('contact', {
      url         : '/contact',
      templateUrl : 'views/contact.html',
      controller  : 'ContactCtrl as vm',
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
