let currentTime = new Date();

//let timeStr = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate();
let timeStr = '2019-10-10';
console.log('currentTime : '+timeStr);

rawDataGateA = [['gate','count'],['입장',0],['퇴장',0],['기록 없음',1]];
rawDataGateB = [['gate','count'],['입장',0],['퇴장',0],['기록 없음',1]];

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawGateAChart);
google.charts.setOnLoadCallback(drawGateBChart);

function drawGateAChart() {
  let data = google.visualization.arrayToDataTable(rawDataGateA);

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

  let gateAChart = new google.visualization.PieChart(document.getElementById('chart-gateA'));
  gateAChart.draw(data,options);
}

function drawGateBChart() {
  let data = google.visualization.arrayToDataTable(rawDataGateB);
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

  let gateBChart = new google.visualization.PieChart(document.getElementById('chart-gateB'));
  gateBChart.draw(data,options);
}

setTimeout ( () => {
  rawDataGateA = [['gate','count'],['입장',0],['퇴장',0]];
  rawDataGateB = [['gate','count'],['입장',0],['퇴장',0]];
  let allEntranceLog = queryAllEntrance();
  let noneGateARecord = true;
  let noneGateBRecord = true;
  for (let i = 0 ; i < allEntranceLog.length ; i ++) {
      if (allEntranceLog[i].timestamp.split(' ')[0] == timeStr) {
        //------------------------------------------------------------------------
        // gate_A의 로그
        //------------------------------------------------------------------------
        if (allEntranceLog[i].location == 'gate_A'){
          let isEnter = (allEntranceLog[i].state == 'in');
          noneGateARecord = false;

          if(isEnter) {
            let count = rawDataGateA[1][1] + 1;
            rawDataGateA.splice(1, 1);
            rawDataGateA.splice(1,0,['입장',count]);
          } else {
            let count = rawDataGateA[2][1] + 1;
            rawDataGateA.splice(2, 1);
            rawDataGateA.splice(2,0,['퇴장',count]);
          }
        //------------------------------------------------------------------------
        // gate_B의 로그
        //------------------------------------------------------------------------
        } else {
          let isEnter = (allEntranceLog[i].state == 'in');
          noneGateBRecord = false;

          if(isEnter) {
            let count = rawDataGateB[1][1] + 1;
            rawDataGateB.splice(1, 1);
            rawDataGateB.splice(1,0,['입장',count]);
          } else {
            let count = rawDataGateB[2][1] + 1;
            rawDataGateB.splice(2, 1);
            rawDataGateB.splice(2,0,['퇴장',count]);
          }
        }
      }
    }

    if (noneGateARecord) rawDataGateA.push(['기록 없음',1]);
    else rawDataGateA.push(['기록 없음',0]);

    if (noneGateBRecord) rawDataGateB.push(['기록 없음',1]);
    else rawDataGateB.push(['기록 없음',0]);

    drawGateAChart();
    drawGateBChart();
  },10);
