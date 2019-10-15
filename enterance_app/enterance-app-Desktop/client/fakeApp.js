
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
  let allEntrance = queryAllEntrance();
  for( let i = 0 ; i < allEntrance.length ; i++ ){
    let temp = queryHistory(allEntrance[i].key);
    for (let j = 0 ; j < temp.length ; j ++ ){
      history.push(temp[j]);
    }
  }
  history.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? 1 : -1 ) ); });
  return history;
}



app.controller ('fakeAppController', ['$scope','$filter',($scope,$filter) => {

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
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:36",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:36",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:36",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:36",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:36",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:37",location:"gate_A",state:"in"},
                   {key:2013122260, name:"정지원", timestamp:"2019-10-16 11:10:38",location:"gate_A",state:"in"},

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
    let arr =[];
    let getArr = $scope.queryHistory(userData.key)
    getArr.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? 1 : -1 ) ); });
    for (let i = 0 ;  i < getArr.length; i ++){
      arr.push(getArr[i]);
      if (arr.length == 8) break;
    }
    return arr;
  }

  let dailyHistory_GateA = [];
  let dailyHistory_GateB = [];
  $scope.dailyLogGroupA = []
  $scope.dailyLogGroupB = []
  $scope.dailyHistory_GateAisEmpty = true;
  $scope.dailyHistory_GateAisEmpty = true;

  $scope.queryDailyHistory = (rawdate) => {
    try{
      let date = $filter('date')(rawdate, 'yyyy-MM-dd');
      dailyHistory_GateA = []
      dailyHistory_GateB = []
      let arr =[];
      let getArr = $scope.queryAllEntrance()
      for (let i = 0 ;  i < getArr.length; i ++){
        let getArr2 = $scope.queryHistory(getArr[i].key);
        for (let j = 0 ; j < getArr2.length ; j ++ ){
          if ( getArr2[j].timestamp.startsWith(date) ){
            if (getArr2[j].location == 'gate_A')
              dailyHistory_GateA.push(getArr2[j])
            else dailyHistory_GateB.push(getArr2[j])
          }
        }
      }
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
    } catch(e) { console.log(e)}
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

  $scope.selectDate = {
       value: new Date()
  };

  $scope.queryDailyHistory($filter('date')($scope.selectDate.value, 'yyyy-MM-dd'));

}])
