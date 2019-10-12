let queryHistoryTop10 = () => {
  console.log("id : "+userData.key);
  $scope.queryHistory = [];
  let arr =[];
  for (let i = 0 ;  i < allHistoryData.length; i ++){
    if (allHistoryData[i].key == userData.key){
      arr.push(allHistoryData[i]);
      $scope.queryHistory.push(allHistoryData[i]);
      if (arr.length == 10) break;
    }
  }
  return arr;
}
