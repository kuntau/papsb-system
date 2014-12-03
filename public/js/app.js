// public/js/app.js

// create the module and name it papsb
angular.module('papsb', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toastr'])

// create the controller and inject Angular's $scope
  .controller('ShellCtrl', ['$scope', function() {

  shell = this;
  // create a message to display in our view
  shell.message = 'Everyone come and see how good id look';
  shell.sidebarStatus = 'sidebar-hidden';
  shell.workshopStatus = false;

  shell.sidebarToggle = function () {
    if (shell.sidebarStatus) {
      shell.sidebarStatus = "";
    } else { shell.sidebarStatus = 'sidebar-hidden' }
  }
  }])

  .controller('aboutController', function () {
    vm = this;
    vm.message = 'This is about page!';
    //$scope.params = $stateParams;
  })

  .controller('contactController', ['$scope', function ($scope) {
    this.message = 'You now can contact us!!';
  }])

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
