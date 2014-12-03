// public/js/app.js

// create the module and name it papsb
angular
  .module('papsb', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toastr'])
  .controller('ShellCtrl', ShellCtrl)
  .controller('WorkshopCtrl', WorkshopCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl);

function ShellCtrl() {
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
};

function WorkshopCtrl($stateParams) {
  vm = this;
}

function AboutCtrl() {
  vm = this;
  vm.message = 'This is about page!';
  //$scope.params = $stateParams;
};

function ContactCtrl($scope) {
  this.message = 'You now can contact us!!';
};

  // .factory('UIService', function() {
  //   
  // });

