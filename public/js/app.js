// public/js/app.js

// create the module and name it papsb
angular
  .module('papsb', [
          'ui.bootstrap',
          'ui.router',
          'ngAnimate',
          'toastr',
          ])
  .controller('ShellCtrl', ShellCtrl)
  .controller('WorkshopCtrl', WorkshopCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl)
  .factory('UIService', UIService);

ShellCtrl.$inject = ['UIService'];

function ShellCtrl(UIService) {
  var shell = this;
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
// WorkshopCtrl.$inject = ['ShellCtrl'];

function WorkshopCtrl(toastr) {
  console.log("WorkshopCtrl");

  var vm = this;
  vm.sidebarStatus = '';
  vm.workshopStatus = true;

  function onEnter() {
    ShellCtrl.openSidebar();
    console.log("openSidebar");
  };

  function onExit() {
    ShellCtrl.closeSidebar();
  };
};

function AboutCtrl() {
  var vm = this;
  vm.message = 'This is about page!';
};

function ContactCtrl($scope) {
  this.message = 'You now can contact us!!';
};

UIService.$inject = ['$rootScope', '$state'];

function UIService($rootScope, $state) {
  var shell = this;
  var sidebarStatus = 'sidebar-hidden';
  var workshopStatus = false;
  console.log("From: UIService/ShellCtrl");
  // create a message to display in our view
  shell.message        = 'Everyone come and see how good id look';
  shell.sidebarStatus  = 'sidebar-hidden';
  shell.workshopStatus = false;

  shell.sidebarToggle = function () {
    if (shell.sidebarStatus) {
      shell.sidebarStatus = "";
    } else { shell.sidebarStatus = 'sidebar-hidden' }
  }

  var service =  {
    openSidebar:        openSidebar,
    closeSidebar:       closeSidebar,
    getSidebarStatus:   getSidebarStatus,
    setSidebarStatus:   setSidebarStatus,
    getWorkshopStatus:  getWorkshopStatus,
    setWorkshopStatus:  setWorkshopStatus,
    getSidebarState :   getSidebarState
  };

  return service;

  function openSidebar() {
    console.log("opening sidebar... ");
    shell.sidebarStatus = '';
    shell.workshopStatus = true;
    return;
  };
  function closeSidebar() {
    console.log("closing sidebar... ");
    shell.sidebarStatus = 'sidebar-hidden';
    shell.workshopStatus = false;
    return;
  };
  function getSidebarStatus() {
    console.log("getSidebarStatus: " + sidebarStatus);
    return sidebarStatus;
  };
  function setSidebarStatus(status) {
    console.log("setSidebarStatus: " + status);
    sidebarStatus = status;
  };
  function getWorkshopStatus() {
    console.log("getWorkshopStatus: " + workshopStatus);
    return workshopStatus;
  };
  function setWorkshopStatus(status) {
    console.log("setWorkshopStatus: " + status);
    workshopStatus = status;
  };
  function getSidebarState() {
    return false;
  };
}

