'use strict';

var app = angular.module('fakeApplication', []);
let allHistoryData =[];
let allStatusData =[];

let queryAllEnterance = () => {
  return  allStatusData;
};

let queryHistory = (id) => {
  let resultArr = [];
  for (let i = 0; i < allQueryData.length; i++) {
    if (id == allQueryData[i].key ){
      resultArr.push(allQueryData[i]);
    }
  }

  return resultArr;
}

let queryEnterance = (id) => {
  let resultArr = {};
  for (let i = 0; i < allStatusData.length; i++) {
    if (id == allStatusData[i].key ){
      return allStatusData[i];
    }
  }
  return null;
}

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
  $scope.queryHistory = [];
  $scope.queryHistoryOnWake = (id) => {
    console.log("id : "+id);
    $scope.queryHistory = [];
    for (let i = 0 ;  i < allHistoryData.length; i ++){
      if (allHistoryData[i].key == id)
        $scope.queryHistory.push(allHistoryData[i]);
    }
  }

  setTimeout($scope.queryHistoryOnWake($scope.uID),1);
}])
