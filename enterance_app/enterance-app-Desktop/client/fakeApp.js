'use strict';

var app = angular.module('fakeApplication', []);
let allQueryData =[];

app.controller ('fakeAppController', ['$scope',($scope) => {

  allQueryData = [ {key:2013122041, name:"김영찬", timestamp:Date.now()},
                           {key:2013122041, name:"김영찬", timestamp:(Date.now()+1000)},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*2)},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*3)},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*4)},
                           {key:2013122201, name:"이승준", timestamp:(Date.now()+1000*5)},
                           {key:2013122041, name:"김영찬", timestamp:(Date.now()+1000*6)},
                           {key:2013122041, name:"김영찬", timestamp:(Date.now()+1000*7)},
                           {key:2013122260, name:"정지원", timestamp:(Date.now()+1000*8)},
                           {key:2013122260, name:"정지원", timestamp:(Date.now()+1000*9)},
                           {key:2013122260, name:"정지원", timestamp:(Date.now()+1000*10)},
                         ];

  $scope.all_enterance = allQueryData;
}])
