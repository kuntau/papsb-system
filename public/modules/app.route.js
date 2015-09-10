/**
 * Created by kuntau on 8/11/14.
 */
'use strict';

// manage all routes in one file
angular.module('papsb')
  .run(['$rootScope', '$state', '$stateParams', 'UI', papsbInit])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', papsbRoute]);

function papsbInit ($rootScope, $state, $stateParams, UI) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  //angular.extend(toastrConfig, {
  //  positionClass        : 'toast-bottom-right',
  //  tapToDismiss         : true,
  //  newestOnTop          : false,
  //  preventOpenDuplicates: true
  //});
  // monitor `state change`
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    if (toState.redirectTo) {
      event.preventDefault();
      $state.go(toState.redirectTo, toParams)
    }
    // set UI state
    UI.setCurrentState(toState);
    var toastrMessage = toParams.page  ? ' ☆' + toParams.page : '';
    // toastr.info(fromState.url + ' ー ' + toState.url + toastrMessage)
  });
}

function papsbRoute ($stateProvider, $urlRouterProvider, $locationProvider) {
  //$locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider
    .otherwise('/login'); // for any unmatched url, redirect here

  $stateProvider
    // route for the workshop page
    .state('workshop', {
      url         : '/workshop',
      templateUrl : 'modules/workshop/views/workshop.html',
      title       : 'Workshop Dashboard',
      controller  : 'WorkshopCtrl as vm',
      redirectTo  : 'workshop.overview'
    })

    .state('workshop.overview', {
      url         : '/overview',
      templateUrl : 'modules/workshop/views/workshop.overview.html',
      title       : 'Overview'
    })

    .state('workshop.message1', {
      url         : '/:page',
      templateUrl : 'modules/workshop/views/workshop.message1.html',
      title       : 'Message 1',
      controller  : function ($scope, $stateParams, getTitle) {
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
        title: 'haish'
      }
    })

    .state('workshop.message2', {
      url         : '/aum/message2',
      templateUrl : 'modules/workshop/views/workshop.message2.html',
      title       : 'Message 2',
      controller  : function ($scope) {
        $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
      }
    })

    .state('about', {
      url         : '/about',
      templateUrl : 'modules/core/views/about.html',
      controller  : 'AboutCtrl as vm',
      title       : 'About Us'
    })

    .state('contact', {
      url         : '/contact',
      templateUrl : 'modules/core/views/contact.html',
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
      templateUrl : 'modules/core/views/login.html',
      title       : 'Login'
      //controller  : 'AuthCtrl as vm'
    });
};
