/// <reference path="../../typings/angularjs/angular.d.ts"/>
// public/js/app.js

// create the module and name it papsb
angular
  .module('papsb', [
          'ui.bootstrap',
          'ui.router',
          'ngAnimate',
          'toastr'
          ])
  .controller('ShellCtrl', ShellCtrl)
  .controller('WorkshopCtrl', WorkshopCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl)
  .factory('UIService', UIService);

ShellCtrl.$inject = ['UIService'];

function papsbConfig(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-right',
    tapToDismiss: true
  });
};

function ShellCtrl(UIService) {
  shell = this;
  // create a message to display in our view
  shell.message        = 'Everyone come and see how good id look';
  shell.sidebarStatus  = UIService.getSidebarStatus();
  shell.workshopStatus = UIService.getWorkshopStatus();

  shell.sidebarToggle = function () {
    if (shell.sidebarStatus) {
      shell.sidebarStatus = "";
    } else { shell.sidebarStatus = 'sidebar-hidden' }
  }
};

WorkshopCtrl.$inject = ['UIService'];

function WorkshopCtrl(ShellCtrl) {
  vm = this;
  console.log("WorkshopCtrl");
};

function AboutCtrl() {
  vm = this;
  vm.message = 'This is about page!';
};

function ContactCtrl($scope) {
  this.message = 'You now can contact us!!';
};

UIService.$inject = ['$rootScope', '$state'];

function UIService($rootScope, $state) {
  var sidebarStatus = 'sidebar-hidden';
  var workshopStatus = false;
  console.log("From: UIService");

  var service =  {
    getSidebarStatus:   getSidebarStatus,
    setSidebarStatus:   setSidebarStatus,
    getWorkshopStatus:  getWorkshopStatus,
    setWorkshopStatus:  setWorkshopStatus,
    getSidebarState :   getSidebarState
  };

  return service;

  function getSidebarStatus() {
    // console.log("getSidebarStatus");
    return sidebarStatus;
  };
  function setSidebarStatus(status) {
    // console.log("setSidebarStatus");
    sidebarStatus = status;
  };
  function getWorkshopStatus() {
    // console.log("getWorkshopStatus");
    return workshopStatus;
  };
  function setWorkshopStatus(status) {
    // console.log("setWorkshopStatus");
    workshopStatus = status;
  };
  function getSidebarState() {
    return false;
  };
}
