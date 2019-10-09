'use strict';

var app = angular.module('fakeApplication', []);
let allQueryData =[];

app.controller ('fakeAppController', ['$scope',($scope) => {

  allQueryData = [ {key:2013122041, name:"김영찬", timestamp:Date.now()},
                           {key:2013122041, name:"김영찬", timestamp:(Date.now()+1000),location:"gate_A",state:"in"},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*2),location:"gate_B",state:"in"},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*3),location:"gate_B",state:"out"},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*4),location:"gate_A",state:"in"},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*5),location:"gate_A",state:"out"},
                           {key:2013122041, name:"김영찬", timestamp:(Date.now()+1000*6),location:"gate_B",state:"in"},
                           {key:2013122041, name:"김영찬", timestamp:(Date.now()+1000*7),location:"gate_A",state:"out"},
                           {key:2013122260, name:"정지원", timestamp:(Date.now()+1000*8),location:"gate_A",state:"in"},
                           {key:2013122260, name:"정지원", timestamp:(Date.now()+1000*9),location:"gate_B",state:"out"},
                           {key:2013122260, name:"정지원", timestamp:(Date.now()+1000*10),location:"gate_B",state:"in"},
                         ];

  $scope.all_enterance = allQueryData;
}])
