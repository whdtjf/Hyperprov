var app = angular.module('fakeApplication', []);

let allHistoryData=[];
let queryHistory;
let test=[];
let queryEnterance;

app.controller ('fakeAppController', ['$scope','$filter',($scope,$filter) => {
    allHistoryData = [ 
    {Key:2013122041, name:"김영찬", timestamp:"2019-10-08 12:10:27",location:"gate_A",state:"in"},
    {Key:2013122041, name:"김영찬", timestamp:"2019-10-08 18:25:45",location:"gate_A",state:"out"},
    {Key:2013122201, name:"이승준", timestamp:"2019-10-09 08:10:27",location:"gate_B",state:"in"},
    {Key:2013122201, name:"이승준", timestamp:"2019-10-09 13:24:11",location:"gate_B",state:"out"},
    {Key:2013122201, name:"이승준", timestamp:"2019-10-09 22:54:35",location:"gate_A",state:"in"},
    {Key:2013122041, name:"김영찬", timestamp:"2019-10-10 09:22:35",location:"gate_B",state:"in"},
    {Key:2013122041, name:"김영찬", timestamp:"2019-10-10 10:59:20",location:"gate_A",state:"out"},
    {Key:2013122260, name:"정지원", timestamp:"2019-10-10 11:10:36",location:"gate_A",state:"in"},
    {Key:2013122260, name:"정지원", timestamp:"2019-10-10 11:35:35",location:"gate_B",state:"out"},
    {Key:2013122260, name:"정지원", timestamp:"2019-10-10 12:01:20",location:"gate_B",state:"in"},
    {Key:2013122041, name:"김영찬", timestamp:"2019-10-16 00:10:32",location:"gate_A",state:"in"}
];

$scope.queryAllEnterance=()=>{
    $scope.all_enterance = allHistoryData;
    // return allHistoryData;
}
$scope.queryHistory=(id)=>{
    let resultArr=[];
    for(let i=0; i<allHistoryData.length; i++){
        if(id==allHistoryData[i].Key){
            resultArr.push(allHistoryData[i]);
        }
    }
    return resultArr;
}
queryHistory=$scope.queryHistory();

$scope.queryHistoryTop10=()=>{
    let arr=[];
    let getArr=$scope.queryHistory(userData.Key);
    getArr.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? -1 : 1 ) ); });
    for (let i = 0 ;  i < getArr.length; i ++){
      arr.push(getArr[i]);
      test.push(getArr[i]);
      if (arr.length == 8) break;
    }
    return arr;
}

$scope.queryEnterance=(id)=>{
    let result;
   try{
        let getArr=$scope.queryHistory(id);
        getArr.sort( (a,b) => {  return ( ( a.timestamp == b.timestamp ) ? 0 : ( ( a.timestamp > b.timestamp ) ? -1 : 1 ) ); });
        result=getArr[0];
        return result;
   }catch(e){
        console.log(e);
        alert("queryEnterance 불가!!");
   }
}
queryEnterance = $scope.queryEnterance
}])

