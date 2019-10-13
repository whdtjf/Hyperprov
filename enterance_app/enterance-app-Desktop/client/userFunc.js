let currentTime = new Date();

//let timeStr = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDate();
let timeStr = '2019-10-10';
console.log('currentTime : '+timeStr);

let rawDataEnter = [['gate','count'],['gate_A',1],['gate_B',1]];
let rawDataExit = [['gate','count'],['gate_A',1],['gate_B',1]];

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
