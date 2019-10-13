'use strict';

var app = angular.module('fakeApplication', []);
let allHistoryData =[];
let allStatusData =[];

let queryHistory;
let queryAllEntrance;
let queryEnterance;

app.controller ('fakeAppController', ['$scope',($scope) => {

  allHistoryData = [ {key:2013122041, name:"김영찬", timestamp:"2019-10-08 12:10:27",location:"gate_A",state:"in"},
                   {key:2013122041, name:"김영찬", timestamp:"2019-10-08 18:25:45",location:"gate_A",state:"out"},
                   {key:2013122201, name:"이승준", timestamp:"2019-10-09 08:10:27",location:"gate_B",state:"in"},
                   {key:2013122201, name:"이승준", timestamp:"2019-10-09 13:24:11",location:"gate_B",state:"out"},
                   {key:2013122201, name:"이승준", timestamp:"2019-10-09 22:54:35",location:"gate_A",state:"in"},
                   {key:2013122201, name:"이승준", timestamp:"2019-10-10 00:12:22",location:"gate_A",state:"out"},
                   {key:2013122041, name:"김영찬", timestamp:"2019-10-10 09:22:35",location:"gate_B",state:"in"},
                   {key:2013122041, name:"김영찬", timestamp:"2019-10-10 10:59:20",location:"gate_A",state:"out"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-10 11:10:36",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-10 11:35:35",location:"gate_B",state:"out"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-10 12:01:20",location:"gate_B",state:"in"},
                ];

  allStatusData = [ {key:2013122201, name:"이승준", timestamp:"2019-10-10 00:12:22",location:"gate_A",state:"out"},
                    {key:2013122041, name:"김영찬", timestamp:"2019-10-10 10:59:20",location:"gate_A",state:"out"},
                    {key:2013122260, name:"정지원", timestamp:"2019-10-10 12:01:20",location:"gate_B",state:"in"},
                ];

  $scope.all_enterance = allHistoryData;

  $scope.queryHistory = (id) => {
    let resultArr = [];
    for (let i = 0; i < allQueryData.length; i++) {
      if (id == allQueryData[i].key ){
        resultArr.push(allQueryData[i]);
      }
    }
    return resultArr;
  }
  queryHistory = $scope.queryHistory;

  $scope.queryAllEntrance = () => {
    return  allStatusData;
  };
  queryAllEntrance = $scope.queryAllEntrance;

  $scope.queryEnterance = (id) => {
    let resultArr = {};
    for (let i = 0; i < allStatusData.length; i++) {
      if (id == allStatusData[i].key ){
        return allStatusData[i];
      }
    }
    return null;
  };
  queryEnterance = $scope.queryEnterance;

}])
