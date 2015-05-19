// public/js/app.js
'use strict';

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
  .controller('AuthCtrl', AuthCtrl)
  .directive('bsHolder', bsHolder)
  .factory('Auth', Auth)
  .factory('UI', UI);

ShellCtrl.$inject = ['$scope', 'UI', 'Auth'];
function ShellCtrl($scope, UI, Auth) {
  console.log("From: ShellCtrl");
  var shell = this;
  // create a message to display in our view
  shell.message        = 'Everyone come and see how good id look';
  shell.sidebarStatus  = UI.getSidebarStatus();
  shell.workshopStatus = UI.getWorkshopStatus();
  shell.user = Auth.isLogged();

  shell.sidebarToggle = function () {
    if (shell.sidebarStatus) {
      shell.sidebarStatus = "";
    } else { shell.sidebarStatus = 'sidebar-hidden' }
  };

  $scope.$watch(UI.getWorkshopStatus, function () {
    shell.workshopStatus = UI.getWorkshopStatus();
    //console.log('ShellCtrl::Watch::WSStatus: ' + shell.workshopStatus);
  });
}


WorkshopCtrl.$inject = ['UI'];
function WorkshopCtrl(UI) {
  //console.log("WorkshopCtrl");

  var vm = this;

  //console.log('WorkshopCtrl::WSStatus: ' + UI.getWorkshopStatus());
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

function AuthCtrl ($scope, $state, Auth, UI) {
  var vm = this;
  vm.giggle = 'noob';
  vm.error = 'nuclear activated';
  vm.message = '';
  vm.user = {
    id: 7,
    username: 'noob',
    password: 'yolo',
    email: 'kuntau17@gmail.com'
  };

  vm.reload = function () {
    $state.reload()
  };
  vm.login = function () {
    console.log('AuthCtrl: ' + vm.user);
    Auth.login(vm.user).then(function (data) {
      console.log(data);
    })
  }
}

function Auth($q, $http, UI) {

  var user = null;

  return {
    isLogged: isLogged,
    username: getUsername,
    login:    login
  };

  function isLogged() {
    return user
  }
  function login(user) {
    return $q(function (resolve, reject) {
      $http.post('/api/login', user)
        .success(function (data) {
          UI.papSuccess('Welcome, ' + data.username);
          resolve(data.username)
        })
        .error(function (data) {
          UI.papError('Login Error')
          reject('login error')
        });
    })
  }
  function getUsername() {
    return user.username
  }
}
UI.$inject = ['toastr'];
function UI(toastr) {
  var sidebarStatus = false;
  var workshopStatus = false;
  console.log("From: UI");

  return {
    getSidebarStatus:   getSidebarStatus,
    setSidebarStatus:   setSidebarStatus,
    getWorkshopStatus:  getWorkshopStatus,
    setWorkshopStatus:  setWorkshopStatus,
    papError:           papError,
    papInfo:            papInfo,
    papSuccess:         papSuccess
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
  function papError(body, head) {
    if (head) {
      toastr.error(head, body)
    } else {
      toastr.error(body)
    }
  }
  function papInfo(body, head) {
    if (head) {
      toastr.info(head, body)
    } else {
      toastr.info(body)
    }
  }
  function papSuccess(body, head) {
    if (head) {
      toastr.success(head, body)
    } else {
      toastr.success(body)
    }
  }
}

