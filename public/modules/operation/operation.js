(function () {
  'use strict';

  angular
    .module('papsb.operation')
    .controller('OperationCtrl', Operation);

  Operation.$inject = [ '$scope', 'dataservice' ];
  function Operation($scope, dataservice) {
    var vm = this;

    getUsers();

    vm.random = function () {
      vm.doug.data = [ 20, 10, 1, 3, 5 ];
      console.log(vm.doug.data);
    }

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
    };

    /* doughnut chart */
    vm.doug = {
      labels: [ 'Hadir', 'Tak Hadir (T)', 'Tak Hadir (D)', 'MC', 'Cuti' ],
      data: [ 25, 5, 2, 2, 1 ]
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

})();
