let currentTime = new Date();

//let timeStr = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate();
let timeStr = '2019-10-10';
console.log('currentTime : '+timeStr);

let rawDataGateA = [['gate','count'],['입장',0],['퇴장',0],['기록 없음',1]];
let rawDataGateB = [['gate','count'],['입장',0],['퇴장',0],['기록 없음',1]];

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawGateAChart);
google.charts.setOnLoadCallback(drawGateBChart);

function drawGateAChart() {
  try{
    let data = google.visualization.arrayToDataTable(rawDataGateA);

    let options = {
      is3D : true, legend : 'none',
      backgroundColor:'transparent',
      slices : {
        is3D: true,legend : 'none',
        slices: {
          0: { color: '#6BE8CD' },
          1: { color: '#81FFC1' },
          2: { color: '#6BE886' },
          3: { color: '#81FF75' }
        },
        chartArea:{
          left:0,
          right:0, // !!! works !!!
          bottom:0,  // !!! works !!!
          top:0,
          width:"100%",
          height:"100%"
        }
      }
    };

    let gateAChart = new google.visualization.PieChart(document.getElementById('chart-gateA'));
    gateAChart.draw(data,options);
  } catch(e) {
    console.log("bug!"+e);
  }
}

function drawGateBChart() {
  try{
    let data = google.visualization.arrayToDataTable(rawDataGateB);
    let options = {
      is3D : true, legend : 'none',
      backgroundColor:'transparent',
      slices : {
        is3D: true,legend : 'none',
        slices: {
          0: { color: '#E87838' },
          1: { color: '#FF714B' },
          2: { color: '#E84438' },
          3: { color: '#FF3D6F' }
        },
        chartArea:{
          left:0,
          right:0, // !!! works !!!
          bottom:0,  // !!! works !!!
          top:0,
          width:"100%",
          height:"100%"
        }
      }
    };

    let gateBChart = new google.visualization.PieChart(document.getElementById('chart-gateB'));
    gateBChart.draw(data,options);
  } catch (e) {
    console.log("bug!"+e);
  }
}

reDraw = () => { setTimeout ( () => {
  rawDataGateA = [['gate','count'],['입장',0],['퇴장',0]];
  rawDataGateB = [['gate','count'],['입장',0],['퇴장',0]];
  let allEntranceLog = queryAllHistory();
  console.log(allEntranceLog)
  let noneGateARecord = true;
  let noneGateBRecord = true;
  let countA_in = 0;
  let countA_out = 0;
  let countB_in = 0;
  let countB_out = 0;
  for (let i = 0 ; i < allEntranceLog.length ; i ++) {
      if (allEntranceLog[i].timestamp.split(' ')[0] == timeStr) {
        //------------------------------------------------------------------------
        // gate_A의 로그
        //------------------------------------------------------------------------
        if (allEntranceLog[i].location == 'gate_A'){
          let isEnter = (allEntranceLog[i].state == 'in');
          noneGateARecord = false;

          if(isEnter) {
            countA_in = rawDataGateA[1][1] + 1;
            rawDataGateA.splice(1, 1);
            rawDataGateA.splice(1,0,['입장',countA_in]);
          } else {
            countA_out = rawDataGateA[2][1] + 1;
            rawDataGateA.splice(2, 1);
            rawDataGateA.splice(2,0,['퇴장',countA_out]);
          }
        //------------------------------------------------------------------------
        // gate_B의 로그
        //------------------------------------------------------------------------
        } else {
          let isEnter = (allEntranceLog[i].state == 'in');
          noneGateBRecord = false;

          if(isEnter) {
            countB_in = rawDataGateB[1][1] + 1;
            rawDataGateB.splice(1, 1);
            rawDataGateB.splice(1,0,['입장',countB_in]);
          } else {
            countB_out = rawDataGateB[2][1] + 1;
            rawDataGateB.splice(2, 1);
            rawDataGateB.splice(2,0,['퇴장',countB_out]);
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
    document.getElementById('targetDate1').innerHTML = timeStr;
    document.getElementById('targetDate2').innerHTML = timeStr;
    document.getElementById('A_in').innerHTML = "" + countA_in;
    document.getElementById('A_out').innerHTML = "" + countA_out;
    document.getElementById('B_in').innerHTML = "" + countB_in;
    document.getElementById('B_out').innerHTML = "" + countB_out;
    document.getElementById('locationDiv').innerHTML = '전자관 6층 ' + timeStr + ' 기록';
  },200);};

  reDraw();
