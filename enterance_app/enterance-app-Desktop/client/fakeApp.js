'use strict';

var app = angular.module('fakeApplication', []);

//=================================================================
//  ADD REAL app.js
//=================================================================
let allHistoryData = [];
let allStatusData = [];
let queryHistory;
let queryAllEntrance;
let queryEnterance;
let queryAllHistory = () => {
  let history = [];
  for( let i = 0 ; i < queryAllEntrance.length ; i++ ){
    let temp = queryHistory(queryAllEntrance[i].name);
    for (let j = 0 ; j < temp.length ; j ++ ){
      history.add(temp[j]);
    }
  }
  history.sort( (str1,str2) => {  return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) ); });

  return history;
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

  $scope.queryHistory = (id) => {
    let resultArr = [];
    for (let i = 0; i < allHistoryData.length; i++) {
      if (id == allHistoryData[i].key ){
        resultArr.push(allHistoryData[i]);
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

  //=================================================================
  //  ADD REAL app.js
  //=================================================================
  $scope.queryHistoryTop10 = () => {
    console.log("id : "+userData.key);
    let arr =[];
    let getArr = $scope.queryHistory(userData.key)
    for (let i = 0 ;  i < getArr.length; i ++){
      arr.push(getArr[i]);
      if (arr.length == 10) break;
    }
    return arr;
  }
}])
