// public/js/app.js
'use strict';

// create the module and name it papsb
angular
  .module('papsb.core')
  // .run(['toastrConfig', coreConfig])
  .controller('ShellCtrl', ShellCtrl)
  .controller('WorkshopCtrl', WorkshopCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl)
  .directive('bsHolder', bsHolder)
  .factory('Auth', Auth)
  .factory('UI', UI);

function coreConfig(toastrConfig) {
  angular.extend(toastrConfig, {
    closeButton: true
  })
};

ShellCtrl.$inject = ['$scope', 'UI', 'Auth'];
function ShellCtrl($scope, UI, Auth) {
  console.log('From: ShellCtrl');
  var shell            = this;
  // core variable
  shell.sidebarStatus  = UI.getSidebarStatus;
  shell.workshopStatus = UI.getWorkshopStatus;
  shell.isLogged       = isLogged;
  shell.login          = login;
  shell.logout         = logout;
  shell.reload         = reload;
  shell.ui             = {state: UI.getCurrentState, sidebar: UI.getSidebarStatus};
  shell.user           = {};

  // temp variable
  shell.loginForm      = { username: 'kuntau', password: 'kunkun' };
  shell.message        = 'Everyone come and see how good id look';

  activate();

  function activate() {
    Auth.get(); /* load previous user from localStorage */
    shell.user = Auth.getUser(); /* pupulate our local user object */
    isLogged();
  }


  function isLogged() {
    Auth.isLogged().then(function (data) {
      shell.user.authenticated = true;
      UI.success('is Logged')
    }, function (data) {
      shell.user.authenticated = false;
      UI.error(data)
    })
  }

  function login() {
    Auth.login(shell.loginForm).then(function (data) {
      shell.user = data;
      UI.success('Welcome, ' + data.username);
      UI.go('workshop');
    }, function (error) {
      shell.user.authenticated = false;
      UI.error(error)
    })
  }

  function logout() {
    Auth.logout().then(function (data) {
      UI.success(data);
      shell.user = {};
      UI.go('login')
    }, function (data) {
      UI.error(data.error)
    })
  }
  function reload() { UI.go() }
}


WorkshopCtrl.$inject = ['$scope','UI'];
function WorkshopCtrl($scope, UI) {
  var vm = this;

  /* line chart */
  vm.line = {
    labels: [ 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad' ],
    series: [ 'Putrajaya Sentral', 'Park & Ride P14' ],
    data: [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ],
    onClick: function (points, event) {
      console.log(points, event)
    }
  }

  /* doughnut chart */
  vm.doug = {
    labels: [ 'Hadir', 'Tak Hadir (T)', 'Tak Hadir (D)', 'MC', 'Cuti' ],
    data: [ 25, 5, 2, 2, 1 ]
  };
}

function AboutCtrl() {
  var vm = this;
  vm.message = 'This is about page!';
}

function ContactCtrl() {
  var vm = this;
  vm.message = 'You now can contact us!!';
}

function ChartCtrl() {
  var vm = this;
}

function bsHolder() {
  return {
    link: function (scope, el, attr) {
      Holder.run(el);
    }
  };
}

function Auth($q, $http) {
  var STORAGE_ID = 'papsb-system';
  var user = { authenticated: false };

  return {
    isLogged: isLogged,
    getUser : getUser,
    login   : login,
    logout  : logout,
    get     : get,
    put     : put
  };

  function isLogged() {
    return $q(function (resolve, reject) {
      $http.get('/api/auth')
        .success(function (data) {
          resolve(data)
        })
        .error(function (error) {
          reject(error.error)
        })
    })
  }
  function login(user) {
    return $q(function (resolve, reject) {
      $http.post('/api/auth', user)
        .success(function (data) {
          user = data;
          user.authenticated = true;
          put(user);
          resolve(data);
        })
        .error(function (data) {
          user = {};
          user.authenticated = false;
          reject(data)
        });
    })
  }

  function logout () {
    return $q(function (resolve, reject) {
      $http.delete('/api/auth', user)
        .success(function (data) {
          localStorage.removeItem(STORAGE_ID);
          user = {};
          resolve(data)
        })
        .error(function (data) {
          reject(data)
        })
    })
  }
  function get() {
    user = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
    console.log('Auth: ' + JSON.stringify(user));
    return user;
  }
  function put(user) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(user))
  }
  function getUser() {
    return user
  }
}

UI.$inject = ['$state', 'toastr', 'toastrConfig'];
function UI($state, toastr, toastrConfig) {
  // angular.extend(toastrConfig, {
  //  positionClass        : 'toast-bottom-right',
  //  tapToDismiss         : true,
  //  newestOnTop          : false,
  //  preventOpenDuplicates: true
  // });

  var sidebarStatus = false;
  var workshopStatus = false;
  var currentState;
  console.log("From: UI");

  return {
    getSidebarStatus : getSidebarStatus,
    setSidebarStatus : setSidebarStatus,
    getWorkshopStatus: getWorkshopStatus,
    setWorkshopStatus: setWorkshopStatus,
    getCurrentState  : getCurrentState,
    setCurrentState  : setCurrentState,
    go               : go,
    info             : info,
    success          : success,
    warning          : warning,
    error            : error
  };

  function getSidebarStatus() { return sidebarStatus }
  function setSidebarStatus(status) { sidebarStatus = status; }
  function getWorkshopStatus() { return workshopStatus; }
  function setWorkshopStatus(status) { workshopStatus = status; }
  function getCurrentState() {
    // console.log( 'state: '  + JSON.stringify( currentState ) );
    return currentState.name
  }
  function setCurrentState(name) { currentState = name; }
  function go(state) {
    if (state) {
      $state.go(state)
    } else $state.reload()
  }
  function info(body, head) {
    if (head) {
      toastr.info(head, body)
    } else {
      toastr.info(body)
    }
  }
  function success(body, head) {
    if (head) {
      toastr.success(head, body)
    } else {
      toastr.success(body)
    }
  }
  function warning(body, head) {
    if (head) {
      toastr.warning(head, body)
    } else {
      toastr.warning(body)
    }
  }
  function error(body, head) {
    if (head)
      toastr.error(head, body)
    toastr.error(body)
  }
}
