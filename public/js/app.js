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
  .directive('bsHolder', bsHolder)
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

function WorkshopCtrl(UIService, $scope) {
  console.log("WorkshopCtrl");

  var vm = this;
  vm.sidebarStatus = '';
  vm.workshopStatus = true;
  UIService.setWorkshopStatus(true);

  //$scope.$apply(function () {
  //  $scope.workshopStatus = true;
  //});

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

function ContactCtrl() {
  var vm = this;
  vm.message = 'You now can contact us!!';
};

function bsHolder() {
  return {
    link: function (scope, el, attr) {
      Holder.run(el);
    }
  };
}

UIService.$inject = [];
function UIService() {
  var sidebarStatus = 'sidebar-hidden';
  var workshopStatus = false;
  console.log("From: UIService/ShellCtrl");

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
  };
  function closeSidebar() {
    console.log("closing sidebar... ");
    shell.sidebarStatus = 'sidebar-hidden';
    shell.workshopStatus = false;
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

