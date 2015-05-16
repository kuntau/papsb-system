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

ShellCtrl.$inject = ['UIService', '$scope'];

function ShellCtrl(UIService, $scope) {
  console.log("From: ShellCtrl");
  var shell = this;
  // create a message to display in our view
  shell.message        = 'Everyone come and see how good id look';
  shell.sidebarStatus  = UIService.getSidebarStatus();
  shell.workshopStatus = UIService.getWorkshopStatus();

  shell.sidebarToggle = function () {
    if (shell.sidebarStatus) {
      shell.sidebarStatus = "";
    } else { shell.sidebarStatus = 'sidebar-hidden' }
  };

  $scope.$watch(UIService.getWorkshopStatus, function () {
    shell.workshopStatus = UIService.getWorkshopStatus();
    console.log('ShellCtrl::Watch::WSStatus: ' + shell.workshopStatus);
  });
}


// WorkshopCtrl.$inject = ['ShellCtrl'];
function WorkshopCtrl(UIService) {
  //console.log("WorkshopCtrl");

  var vm = this;

  //console.log('WorkshopCtrl::WSStatus: ' + UIService.getWorkshopStatus());
}

function AboutCtrl() {
  var vm = this;
  vm.message = 'This is about page!';
}

function ContactCtrl() {
  var vm = this;
  vm.message = 'You now can contact us!!';
}

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
  console.log("From: UIService");

  return {
    getSidebarStatus:   getSidebarStatus,
    setSidebarStatus:   setSidebarStatus,
    getWorkshopStatus:  getWorkshopStatus,
    setWorkshopStatus:  setWorkshopStatus,
  };

  function getSidebarStatus() {
    //console.log("getSidebarStatus: " + sidebarStatus);
    return sidebarStatus;
  }
  function setSidebarStatus(status) {
    //console.log("setSidebarStatus: " + status);
    sidebarStatus = status;
  }
  function getWorkshopStatus() {
    //console.log("getWorkshopStatus: " + workshopStatus);
    return workshopStatus;
  }
  function setWorkshopStatus(status) {
    //console.log("setWorkshopStatus: " + status);
    workshopStatus = status;
  }
}

