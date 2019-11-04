// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

//=================================================================
//  ADD REAL app.js
//=================================================================
let allHistoryData = [];
let allStatusData = [];
let queryHistory;
let queryHistory_result;
let queryAllEntrance;
let queryAllEntrance_result;
let queryEnterance;
let queryEnterance_result;

let id_temp;
let queryAllHistory_result;
let queryAllHistory = () => {
  queryaAllHistory_2nd(queryAllEntrance())
}

let queryaAllHistory_2nd = (allEnterance) =>{
  for( let i = 0 ; i < allEnterance.length ; i++ ){
    queryaAllHistory_3nd(queryHistory(allEnterance[i].Key));
  }
}

let queryaAllHistory_3nd = (temp) => {
  for (let j = 0 ; j < temp.length ; j ++ ){
    queryAllHistory_result.push(temp[j]);
  }
}

// Angular Controller
app.controller('appController', function($scope, appFactory,$filter){

   //queryAllenterance 라는 ng-click에 function() 이하를 넣는다
   $scope.queryAllEnterance = function(){
      appFactory.queryAllEnterance(function(data){ //appFactory.queryAllEnterance하면 get방식으로 enterance모든 데이터가 callback으로 넘겨짐
         var array = [];
         for (var i = 0; i < data.length; i++){
            parseInt(data[i].Key);
            data[i].Record.Key = parseInt(data[i].Key);
            array.push(data[i].Record);
         }
         array.sort(function(a, b) {
             return parseInt(a.Key) - parseInt(b.Key);
         });
         allStatusData = array;
         return allStatusData;
      });
   }
   queryAllEntrance = $scope.queryAllEnterance;



  $scope.queryEnterance = function(id){
      appFactory.queryEnterance(id, function(data){
        console.log(data);
        queryEnterance_result = data;
        return data;
      });
   }
   queryEnterance = $scope.queryEnterance
   id_temp= $scope.enterance_id; //id확인

   $scope.queryHistory = function(id){
      appFactory.queryHistory(id, function(data){
        queryHistory_result = data;
        return data;
      });
   }
   queryHistory = $scope.queryHistory

   //=================================================================
  //  ADD REAL app.js
  //=================================================================
  $scope.queryHistoryTop10 = (callback) => {
    console.log(parseInt(sessionStorage.getItem('uID').replace(/["]/g,'')));
    let data = $scope.queryHistory(parseInt(sessionStorage.getItem('uID').replace(/["]/g,'')))
    setTimeout(() => {console.log(data);callback(data)},1000);
  }

  let queryHistoryTop10_2nd = (data) => {
    let arr =[];
    data.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? -1 : 1 ) ); });
    for (let i = 0 ;  i < data.length; i ++){
      arr.push(getArr[i]);
      if (arr.length == 8) break;
    }
    $scope.queryHistoryTop10_result = array;
  }
  $scope.queryHistoryTop10(queryHistoryTop10_2nd);

  $scope.selectDate = {
       value: new Date()
  };
});

// Angular Factory
app.factory('appFactory', function($http){

   var factory = {};

    factory.queryAllEnterance = function(callback){

       $http.get('/get_all_enterance/').success(function(output){
         callback(output)
      });
   }

   factory.queryEnterance = function(id, callback){
      $http.get('/get_enterance/'+id)
      .then(function success(output){
         console.log(output);
         callback(output)
      }, function error(err){
         console.error(err);
         callback(err);
      });
   }

   factory.queryHistory = (id, callback) => {
      $http.get('/get_history/'+id)
      .then(function success(output){
         callback(output)
      }, function error(err){
         console.error(err);
         callback(err);
      });
   }

   factory.recordBarcode = function(data, callback){

      var enterance = data.id + "-" + data.name + "-" + data.timestamp+ "-" + data.location+ "-" + data.state;

       $http.get('/add_barcode/'+enterance).success(function(output){
         callback(output)
      });
   }

   factory.UpdateEnterance = function(data, callback){

      var updated_enterance = data.id + "-" + data.timestamp+ "-" + data.location+ "-" + data.state;

       $http.get('/update_enterance/'+updated_enterance).success(function(output){
         callback(output)
      });
   }

   return factory;
});
