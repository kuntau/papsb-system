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

ShellCtrl.$inject = ['$scope', '$state','UI', 'Auth'];
function ShellCtrl($scope, $state, UI, Auth) {
  console.log("From: ShellCtrl");
  var shell = this;
  Activate();

  function Activate() {
    // create a message to display in our view
    shell.message = 'Everyone come and see how good id look';
    shell.sidebarStatus = UI.getSidebarStatus;
    shell.workshopStatus = UI.getWorkshopStatus;
    shell.auth = Auth.isLogged;
    shell.user = {
      //authenticated: Auth.isLogged
    };

    //console.log('ShellCtrl: Activate ' +  shell.user.authenticated);
    Auth.get();
    //shell.user = Auth.getUser();
  }

  $scope.$watch(Auth.isLogged, function () {
    shell.user = Auth.getUser();
    //console.log('ShellCtrl::Watch::WSStatus: ' + shell.workshopStatus);
  });

  shell.logout = function () {
    Auth.logout().then(function (data) {
      UI.success(data);
      $state.go('login')
    }, function (error) {
      UI.error(error)
    })
  }
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
    username: 'kuntau',
    password: 'yolo'
  };

  vm.reload = function () {
    $state.reload()
  };
  vm.login = function () {
    Auth.login(vm.user).then(function (data) {
      UI.success('Welcome, ' + data.username);
      $state.go('workshop');
    }, function (error) {
      UI.error(error)
    })
  }
}

function Auth($q, $http) {
  var STORAGE_ID = 'papsb-system';
  var user = {
    authenticated: false
  };

  return {
    isLogged: isLogged,
    getUser : getUser,
    login   : login,
    logout  : logout,
    get     : get,
    put     : put
  };

  function isLogged() {
    return user.authenticated
  }
  function login(user) {
    return $q(function (resolve, reject) {
      $http.post('/api/auth/login', user)
        .success(function (data) {
          user = data;
          user.authenticated = true;
          put(user);
          resolve(data);
        })
        .error(function (reason) {
          reject(reason)
        });
    })
  }

  function logout () {
    return $q(function (resolve, reject) {
      $http.delete('/api/auth/logout', user)
        .success(function (data) {
          localStorage.removeItem(STORAGE_ID);
          if (data.error)
            return reject(data.error)
          resolve(data)
        })
        .error(function (reason) {
          reject(reason)
        })
    })
  }
  function get() {
    user = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    //console.log('Auth: ' + user);
    return user;
  }
  function put(user) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(user))
  }
  function getUser() {
    return user
  }
}
UI.$inject = ['$state', 'toastr'];
function UI($state, toastr) {
  var sidebarStatus = false;
  var workshopStatus = false;
  console.log("From: UI");

  return {
    getSidebarStatus : getSidebarStatus,
    setSidebarStatus : setSidebarStatus,
    getWorkshopStatus: getWorkshopStatus,
    setWorkshopStatus: setWorkshopStatus,
    go               : go,
    error            : error,
    info             : info,
    warning          : warning,
    success          : success
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
  function go(state) {
    $state.go(state)
  }
  function error(body, head) {
    if (head) {
      toastr.error(head, body)
    } else {
      toastr.error(body)
    }
  }
  function info(body, head) {
    if (head) {
      toastr.info(head, body)
    } else {
      toastr.info(body)
    }
  }
  function warning(body, head) {
    if (head) {
      toastr.warning(head, body)
    } else {
      toastr.warning(body)
    }
  }
  function success(body, head) {
    if (head) {
      toastr.success(head, body)
    } else {
      toastr.success(body)
    }
  }
}

