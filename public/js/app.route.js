/**
 * Created by kuntau on 8/11/14.
 */
'use strict';

// manage all routes in one file
angular.module('papsb')
  .run(['$rootScope', '$state', '$stateParams', 'toastr', 'toastrConfig', papsbInit])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', papsbRoute]);

function papsbInit ($rootScope, $state, $stateParams, toastr, toastrConfig) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  angular.extend(toastrConfig, {
    positionClass        : 'toast-bottom-right',
    tapToDismiss         : true,
    newestOnTop          : false,
    preventOpenDuplicates: true
  });
  // monitor `state change`
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    if (toState.redirectTo) {
      event.preventDefault();
      $state.go(toState.redirectTo, toParams)
    }
    var toastrMessage = toParams.page  ? ' ☆' + toParams.page : '';
    //toastr.info(fromState.url + ' ー ' + toState.url + toastrMessage)
  });
}

function papsbRoute ($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider
    .otherwise('login'); // for any unmatched url, redirect here

  $stateProvider
    // route for the workshop page
    .state('workshop', {
      url         : '/workshop',
      templateUrl : 'views/workshop/workshop.html',
      title       : 'Workshop Dashboard',
      controller  : 'WorkshopCtrl as vm',
      redirectTo  : 'workshop.overview',
      onEnter     : function (UI) {
        UI.setWorkshopStatus(true);
      },
      onExit     : function (UI) {
        UI.setWorkshopStatus(false);
      }
    })

    .state('workshop.overview', {
      url         : '/overview',
      templateUrl : 'views/workshop/workshop.overview.html',
      title       : 'Overview',
      // controller  : function ($scope, toastr) {
      //   $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
      // }
    })
    .state('workshop.message1', {
      url         : '/:page',
      templateUrl : 'views/workshop/workshop.message1.html',
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

    .state('workshop.message2', {
      url         : '/aum/message2',
      templateUrl : 'views/workshop/workshop.message2.html',
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
      title       : 'Login',
      controller  : 'AuthCtrl as vm'
    });
};
