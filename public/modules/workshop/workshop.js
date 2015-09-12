(function () {
  'use strict';

  angular
    .module('papsb.workshop')
    .controller('WorkshopCtrl', Workshop)
    .controller('BusListCtrl', BusList)
    .controller('PageParamsCtrl', PageParams);

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

  BusList.$inject = [ '$scope' ];
  function BusList($scope) {
    var vm = this;

    vm.names = ["Nizam", "Hassan", "Adam", "Burhan"];
    vm.buses = [
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' },
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' },
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' },
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' },
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' },
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' },
      { id: 1, plate_no: 'WFJ 7889', depot: 'Putrajaya Sentral', road_tax: '17 Oktober 2015', permit: '25 Oktober 2015' }
    ];
  };

  PageParams.$inject = [ '$scope', '$stateParams', 'getTitle' ];
  function PageParams($scope, $stateParams, getTitle) {
    var vm = this;

    $scope.names = ["Nizam", "Hassan", "Adam", "Burhan"];
    $scope.title = getTitle.title;
    $scope.page = $stateParams.page;

    var massive = [];

    for (var i = 10 - 1; i >= 0; i--) {
      var word = 'random useless ' + $scope.page + ' and the couting: ' + i;
      // toastr.warning(word);
      massive.push(word)
    }
    $scope.massive = massive;
  };

})();
