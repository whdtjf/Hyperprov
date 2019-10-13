let currentTime = new Date();

//let timeStr = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate();
let timeStr = '2019-10-10';
console.log('currentTime : '+timeStr);

let rawDataEnter = [['gate','count'],['gate_A',0],['gate_B',0],['기록 없음',1]];
let rawDataExit = [['gate','count'],['gate_A',0],['gate_B',1],['기록 없음',0]];

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawEnterChart);
google.charts.setOnLoadCallback(drawExitChart);

function drawEnterChart() {
  let data = google.visualization.arrayToDataTable(rawDataEnter);

  let options = {
    is3D : true, legend : 'none',
    slices : {
      is3D: true,legend : 'none',
      slices: {
        0: { color: '#6BE8CD' },
        1: { color: '#81FFC1' },
        2: { color: '#6BE886' },
        3: { color: '#81FF75' }
      },
      chartArea:{
        left:10,
        right:10, // !!! works !!!
        bottom:0,  // !!! works !!!
        top:0,
        width:"100%",
        height:"100%"
      }
    }
  };

  let enterChart = new google.visualization.PieChart(document.getElementById('chart-enter'));
  enterChart.draw(data,options);
}

function drawExitChart() {
  let data = google.visualization.arrayToDataTable(rawDataExit);
  let options = {
    is3D : true, legend : 'none',
    slices : {
      is3D: true,legend : 'none',
      slices: {
        0: { color: '#E87838' },
        1: { color: '#FF714B' },
        2: { color: '#E84438' },
        3: { color: '#FF3D6F' }
      },
      chartArea:{
        left:10,
        right:10, // !!! works !!!
        bottom:0,  // !!! works !!!
        top:0,
        width:"100%",
        height:"100%"
      }
    }
  };

  let exitChart = new google.visualization.PieChart(document.getElementById('chart-exit'));
  exitChart.draw(data,options);
}

setTimeout ( () => {
  let allEntranceLog = queryAllEntrance();
  console.log(allEntranceLog);
  console.log(allEntranceLog.length);
  for (let i = 0 ; i < allEntranceLog.length ; i ++) {

      console.log (allEntranceLog[i].timestamp.split(' ')[0]+' == ' + currentTime +'?');

      if (allEntranceLog[i].timestamp.split(' ')[0] == timeStr){
        let flag = false;  let index = 0;
	console.log('wow! : '+i);
        //------------------------------------------------------------------------
        // 입장한 경우
        //------------------------------------------------------------------------
        if (allEntranceLog[i].state == 'in'){
          for(let j = 0; j < rawDataEnter.length; j++) {
            if (allEntranceLog[i].location == rawDataEnter[j][0]){
              flag = true;
              index = j;
              break;
            }
          }

          if(flag) {
            let count = rawDataEnter[index][1] + 1;
            rawDataEnter.splice(index, 1);
            rawDataEnter.splice(index,0,[allEntranceLog[i].location,count]);
            console.log(rawDataEnter);
          } else {
            rawDataEnter.push([allEntranceLog[i].location,1]);
            console.log(rawDataEnter);
          }
        //------------------------------------------------------------------------
        // 퇴장한 경우
        //------------------------------------------------------------------------
        } else {
          for(let j = 0; j < rawDataExit.length; j++) {
            if (allEntranceLog[i].location == rawDataExit[j][0]){
              flag = true;
              index = j;
              break;
            }
          }

          if(flag) {
            let count = rawDataExit[index][1] + 1;
            rawDataExit.splice(index, 1);
            rawDataExit.splice(index,0,[allEntranceLog[i].location,count]);
            console.log(rawDataExit);
          } else {
            rawDataExit.push([allEntranceLog[i].location,1]);
            console.log(rawDataExit);
          }
        }
      }
    }

    console.log(rawDataEnter);
    console.log(rawDataExit);
    drawEnterChart();
    drawExitChart();
  },1000);
