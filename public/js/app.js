// public/js/app.js

// create the module and name it papsb
angular.module('papsb', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toastr'])

// configure our routes

// create the controller and inject Angular's $scope
  .controller('ShellCtrl', ['$scope', function() {

  vm = this;
  // create a message to display in our view
  vm.message = 'Everyone come and see how good id look';
  vm.sidebarStatus = 'sidebar-hidden';
  vm.workshopStatus = false;

  vm.sidebarToggle = function () {
    if (vm.sidebarStatus) {
      vm.sidebarStatus = "";
    } else { vm.sidebarStatus = 'sidebar-hidden' }
  }
  }])

  .controller('aboutController', function ($scope) {
    $scope.message = 'This is about page!';
  })

  .controller('contactController', function ($scope) {
    $scope.message = 'Contact us!!';
  })

  .directive('appLogin', function () {
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
  });
