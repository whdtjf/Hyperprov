let currentTime = new Date();

let timeStr = currentTime.getFullYear() + "-" + (currentTime.getMonth()+1) + "-" + currentTime.getDay();
console.log('currentTime : '+timeStr);

setTimeout ( () => {
  let allEntranceLog = queryAllEntrance();
  function drawEnterChart() {
    let rawData = [];
    for (let i = 0 ; i < allEntranceLog.length ; i ++) {
      if (allEntranceLog[i].timestamp.startWith(currentTime) &&
          allEntranceLog[i].state === "in"){

        let flag = false; let index = 0;
        for(let j = 0; j < data.length; j++) {
          if (allEntranceLog[i].location === rawData[j][0]){
            flag = true;
            index = j;
            break;
          }
        }

        if(flag) {
          let count = rawData[index][1] + 1;
          rawData.splice(index, 1);
          rawData.splice(index,0,[allEntranceLog[i].location,count]);
        } else {
          rawData.push([allEntranceLog[i].location,1]);
        }
      }
    }

    let data = google.visualization.arrayToDataTable(rawData);

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
    let rawData = [];
    for (let i = 0 ; i < allEntranceLog.length ; i ++) {
      if (allEntranceLog[i].timestamp.startWith(currentTime) &&
          allEntranceLog[i].state === "out"){

        let flag = false; let index = 0;
        for(let j = 0; j < data.length; j++) {
          if (allEntranceLog[i].location === rawData[j][0]){
            flag = true;
            index = j;
            break;
          }
        }

        if(flag) {
          let count = rawData[index][1] + 1;
          rawData.splice(index, 1);
          rawData.splice(index,0,[allEntranceLog[i].location,count]);
        } else {
          rawData.push([allEntranceLog[i].location,1]);
        }
      }
    }

    let data = google.visualization.arrayToDataTable(rawData);

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

  google.charts.setOnLoadCallback(drawEnterChart);
  google.charts.setOnLoadCallback(drawExitChart);
},10);
