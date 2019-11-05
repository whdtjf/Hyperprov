// SPDX-License-Identifier: Apache-2.0
'use strict';
var app = angular.module('application', []);

//=============================================================================
//  Main page Angular.JS
//  ---------------------------------------------------------------------------
//  ◆ 구현된 함수
//  ┣ queryHistoryTop8 : line 21
//  ┣ queryDailyHistory : line 51
//  ┗ selectDate : line 51
//=============================================================================
let queryAllHistory_result;

//=============================================================================
app.controller('appController', function($scope,$filter,$http) {
  //===========================================================================
  //  QUERY HISTORY TOP 8    |    KimYC1223
  //  -------------------------------------------------------------------------
  //  자신의 최근 8개 히스토리 출력
  //===========================================================================
  $scope.queryHistoryTop8 = () => {
    // session에서 로그인된 Key 받아옴
    let key = parseInt(sessionStorage.getItem('uID').replace(/["]/g,''))
    // Key를 통해 get_history
    $http.get('/get_history/'+key).then(function success(rawData){
      $scope.queryHistoryTop8_result =[];   // 배열 초기화
      let data = rawData.data;              // 받아온 데이터에서 data만 꺼냄
      data.sort( (a,b) => {                 // timestamp에 의한 소팅
        return ( ( a.Value.timestamp == b.Value.timestamp ) ?
        0 : ( ( a.Value.timestamp > b.Value.timestamp ) ?
         -1 : 1 ) ); });

      // 소팅 후 최근 순서부터 하나씩 출력
      for (let i = 0 ;  i < data.length; i ++){
        $scope.queryHistoryTop8_result.push(data[i].Value);
        if ($scope.queryHistoryTop8_result.length == 8) break;
        // 최대 8개 까지 출력
      }
      return $scope.queryHistoryTop8_result;
    })
  }
  $scope.queryHistoryTop8();
  //===========================================================================


  //===========================================================================
  //  QUERY ALL HISTORY    |    KimYC1223
  //  -------------------------------------------------------------------------
  //  모든 사람의 모든 히스토리 출력
  //===========================================================================
  let dailyHistory_GateA = [];
  let dailyHistory_GateB = [];
  $scope.dailyLogGroupA = []
  $scope.dailyLogGroupB = []
  $scope.dailyHistory_GateAisEmpty = true;
  $scope.dailyHistory_GateAisEmpty = true;
  let dataCount = 0;
  let currentCount = 0;

  $scope.queryDailyHistory = (rawdate) => {
    try{
      let temp = $filter('date')(rawdate, 'yyyy.M.d').split('.');
      let date = Number(temp[0]) + '.'
                +  Number(temp[1]) + '.'
                +  Number(temp[2]);
      console.log('target'+date);
      dailyHistory_GateA = []
      dailyHistory_GateB = []
      $http.get('/get_all_enterance/').success(function(data){
        dataCount = data.length
        currentCount = 0
        for (let i = 0 ; i < dataCount; i ++ ) {
          let key = data[i].Key                     // i번째 유저의 Key를 가져옴
          $http.get('/get_history/'+key).then(function success2(rawData2){
            currentCount += 1
            let data2 = rawData2.data

            // 해당 유저의 모든 히스토리 기록을 저장함
            for (let j = 0; j < data2.length; j ++){
              let timestamp = data2[j].Value.timestamp
              try{
                if (timestamp.split(' ').length !=2){
                  let temp = new Date(Number(timestamp))
                  timestamp = temp.getFullYear() + "."
                  timestamp += (temp.getMonth()+1) + "."
                  timestamp += temp.getDate() + ""
                }
              }catch(e) {}

              if (timstamp.startsWith(date)) {
                if (getArr2[j].location == 'west')
                  dailyHistory_GateA.push(data2[j].Value)
                else dailyHistory_GateB.push(data2[j].Value)
              }
            }
            $scope.queryDailyHistory_2Step();
          })
        }
      });
    } catch(e) { console.log(e)}
  }

  $scope.queryDailyHistory_2Step = () => {
      if (dataCount != currentCount) return;

      dailyHistory_GateA.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? 1 : -1 ) ); });
      dailyHistory_GateB.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? 1 : -1 ) ); });

      $scope.dailyLogGroupA = []
      $scope.dailyLogGroupB = []

      for (let j = 0; j <= ((dailyHistory_GateA.length+1) / 6); j++) {
        let page = 0;
        let smallGroup = [];
        for(let i = j*6; i < j*6+6; i ++){
          if (dailyHistory_GateA.length <= i) break;
          smallGroup.push(dailyHistory_GateA[(page)*6 + i])
        }
        if (smallGroup.length == 0) break;
        $scope.dailyLogGroupA.push(smallGroup)
        page = page +1
      }

      for (let j = 0; j <= ((dailyHistory_GateB.length+1) / 6); j++) {
        let page = 0;
        let smallGroup = [];
        for(let i = j*6; i < j*6+6; i ++){
          if (dailyHistory_GateB.length <= i) break;
          smallGroup.push(dailyHistory_GateB[(page)*6 + i])
        }
        if (smallGroup.length == 0) break;
        $scope.dailyLogGroupB.push(smallGroup)
        page = page +1
      }

      $scope.pagingDailyLog(0,true)
      $scope.pagingDailyLog(0,false)
  }

  $scope.DailyLogA = []
  $scope.DailyLogB = []
  $scope.pageA = 1;
  $scope.pageB = 1;

  $scope.pagingDailyLog = (page,isA) => {
    try{
      let totalGroup = (isA)? $scope.dailyLogGroupA:$scope.dailyLogGroupB
      let DailyLog = []
      for(let i = 0; i < 6; i ++){
        if (totalGroup[page].length <= i) break;
        DailyLog.push(totalGroup[page][i])
      }

      if (isA) { $scope.dailyHistory_GateAisEmpty = (DailyLog.length == 0)? true: false; $scope.DailyLogA = DailyLog; $scope.pageA = page+1 }
      else { $scope.dailyHistory_GateBisEmpty = (DailyLog.length == 0)? true: false; $scope.DailyLogB = DailyLog; $scope.pageB = page+1 }
    } catch (e) {
      if (isA) { $scope.dailyHistory_GateAisEmpty = true; $scope.DailyLogA = []; $scope.pageA = page+1 }
      else { $scope.dailyHistory_GateBisEmpty = true; $scope.DailyLogB = []; $scope.pageB = page+1 }
    }

  }
  //===========================================================================

  $scope.selectDate = {
       value: new Date()
  };

  $scope.queryDailyHistory($filter('date')($scope.selectDate.value, 'yyyy.MM.dd'))
});
