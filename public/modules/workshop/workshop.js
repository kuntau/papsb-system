(function () {
  'use strict';

  angular
    .module('papsb.workshop')
    .controller('WorkshopCtrl', Workshop)
    .controller('OverviewCtrl', Overview);

  Workshop.$inject = [ '$scope', 'dataservice' ];
  function Workshop($scope, dataservice) {
    var vm = this;

    getUsers();

    $scope.$on('LoginEvent', function (event, data) {
      console.log('On event: %s data: %s', event.name, data.user);
    });

    vm.random = function () {
      var username = faker.name.firstName();
      $scope.$emit('ChangeName', { username: username });
      // vm.doug.data = [ 20, 10, 1, 3, 5 ];
      // console.log(vm.doug.data);
    }

    /* line chart */
    vm.line = {
      labels: [ 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad' ],
      series: [ 'Putrajaya Sentral', 'Park & Ride P14' ],
      data: [
        [6, 5, 8, 8, 5, 5, 4],
        [8, 4, 0, 9, 6, 2, 9]
      ],
      onClick: function (points, event) {
        console.log(points, event)
      }
    };

    /* doughnut chart */
    vm.doug = {
      labels: [ 'Service', 'Air Cond', 'Tyre', 'Under Power', 'Brake' ],
      data: [ 7, 2, 2, 2, 1 ]
    };

    /* faker */
    function getUsers() {
      return dataservice.getUsers()
        .then(function(data) {
          vm.users = data;
          return vm.users;
        });
    }
  } //WorkshopCtrl

  Overview.$inject = [ '$scope' ];
  function Overview($scope) {
    var vm = this;

    $scope.$on('LoginEvent', function (event, data) {
      console.log('asfdasdfsadf', event, data);
    });

  };

})();
