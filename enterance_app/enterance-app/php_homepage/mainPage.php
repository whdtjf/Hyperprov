<html>
  <head>
    <link rel="stylesheet" href="bootstrap-3.3.2-dist/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="bootstrap-3.3.2-dist/js/bootstrap.min.js"></script>

    <style type="text/css">
      @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans|Jua&display=swap');

      html, body {font-family: 'Jua', sans-serif;}


    	/* The Modal (background) */
    	.modal {
        overflow: scroll;
    	  display: none; /* Hidden by default */
    	  position: fixed; /* Stay in place */
    	  z-index: 1; /* Sit on top */
    	  left: 0;
    	  top: 0;
    	  width: 100%; /* Full width */
    	  height: 100%; /* Full height */
    	  overflow: auto; /* Enable scroll if needed */
    	  background-color: rgb(0,0,0); /* Fallback color */
    	  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    	  -webkit-animation-name: fadeIn; /* Fade in the background */
    	  -webkit-animation-duration: 0.4s;
    	  animation-name: fadeIn;
    	  animation-duration: 0.4s
    	}

    	/* Modal Content */
    	.modal-content {
        overflow: scroll;
    	  position: fixed;
    	  bottom: 0;
    	  background-color: #136BAE;
    	  width:300px;
        height : 100%;
    	  -webkit-animation-name: slideIn;
    	  -webkit-animation-duration: 0.4s;
    	  animation-name: slideIn;
    	  animation-duration: 0.4s
    	}


    /* Add Animation */
    @-webkit-keyframes slideIn {
      from {left: -100%; opacity: 0}
      to {left: 0%; opacity: 1}
    }

    @keyframes slideIn {
      from {left: -100%; opacity: 0}
      to {left: 0%; opacity: 1}
    }

    @-webkit-keyframes fadeIn {
      from {opacity: 0}
      to {opacity: 1}
    }

    @keyframes fadeIn {
      from {opacity: 0}
      to {opacity: 1}
    }

    </style>
  </head>

  <body>

    <br>
    <center>
      <table width = "90%">
        <tr>
          <td width = "100%" bgcolor="##5BC4FF">
            <center>
              <br>
              <?php
                $userName = $_GET['user'];
                echo('<img src ="./img/icon/');
                echo($userName);
                echo('.png" style="width:30%;min-width:150px;max-width:300px"> ');
              ?>
              <font size="6"color="white"><br><?=$userName; ?>님, 반갑습니다.</font><br>
              <button type="button" class="btn btn-warning"><font size="6">관리자</font></button>
              <br>
              <br>
            </center>
          </td>
        </tr>
      </table>
      <br>
      <button type="button" class="btn btn-primary" id="menuBtn" style="width:90%;">
          <font size="6" color="white">　　메인 메뉴　　</font>
      </button>
      <br><br>
    </center>
    <div align="center">
      <table width="80%">
        <tr><td><h2>   월간 총 입장 통계  <button>query</button></h2>
        </td></tr>
        
      </table>
      <hr width="90%">
      <div id="chart_div" style="width:90%;height:300px;
        margin-top:-50px;
        padding-top:-50px;
      "></div>
      <script>
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(init);

        function init() {
    			var options = {
    				title: '',			// chart의 제목
    				chartArea: { width: '100%' },		// chart가 표시되는 크기
    				bar: { groupWidth: '70%' },		// chart 내부의 bar 너비
    				animation: {					// animation 효과
                 duration: 1000,
       					easing: 'out',
    				},
            legend : 'none',
    				vAxis: { title: '', minValue: 0, maxValue: 30 },	// y축 옵션
    				//hAxis: { title: '요일', minValue: 0 },					// x축 옵션

    				// 이 옵션을 제거하면 hover할 경우에 tooltip 생성됨
    				// 클릭되었을 때만 tooltip이 생성되도록 하는 옵션
    				tooltip: { trigger: 'selection' },
            series: {
              0: { color: '#3aaf1b' }
            }
    			};

          var data = new google.visualization.DataTable();
    			data.addColumn('string', 'N');			// column을 추가(data type이 string, 이름이 N)
    			data.addColumn('number', '입장');	// column을 추가(data type이 number, 이름이 Value)
          data.addColumn({ type: 'number', role: 'annotation' });


          var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
          function drawChart() {
    				// Disabling the button while the chart is drawing.
    				google.visualization.events.addListener(chart, 'ready',
    					function () {
    					});
    				chart.draw(data, options);
    			}

          for (var i = 1 ; i <= 30 ; i ++) {
            data.addRow(['9/'+i,0, 0]);
          }
          drawChart();

          setTimeout(function() {

            var visit = [2,24,19,22,21,17,5,
                         3,24,21,16,0,0,0,
                         1,18,20,28,26,20,4,
                         1,6,0,0,0,0,0,0,0];
            for (var i = 0; i < data.getNumberOfRows(); i++) {
              data.setValue(i,1,visit[i]);
              data.setValue(i,2,visit[i]);
            }
            drawChart();
          },2);

        }
      </script>
    </div>

    <div align="center">
      <table width="80%">
        <tr><td><h2>   월간 총 퇴장 통계</h2>
        </td></tr>
      </table>
      <hr width="90%">
      <div id="chart_div2" style="width:90%;height:300px;
        margin-top:-50px;
        padding-top:-50px;
      "></div>
      <script>
        google.charts.setOnLoadCallback(init2);

        function init2() {
    			var options2 = {
    				title: '',			// chart의 제목
    				chartArea: { width: '100%' },		// chart가 표시되는 크기
    				bar: { groupWidth: '70%' },		// chart 내부의 bar 너비
    				animation: {					// animation 효과
                 duration: 1000,
       					easing: 'out',
    				},
    				vAxis: { title: '', minValue: 0, maxValue: 30 },	// y축 옵션
    				//hAxis: { title: '요일', minValue: 0 },					// x축 옵션
            legend : 'none',
    				// 이 옵션을 제거하면 hover할 경우에 tooltip 생성됨
    				// 클릭되었을 때만 tooltip이 생성되도록 하는 옵션
    				tooltip: { trigger: 'selection' },
            series: {
              0: { color: '#e2431e' }
            }
    			};

          var data2 = new google.visualization.DataTable();
    			data2.addColumn('string', 'N');			// column을 추가(data type이 string, 이름이 N)
    			data2.addColumn('number', '퇴장');	// column을 추가(data type이 number, 이름이 Value)
          data2.addColumn({ type: 'number', role: 'annotation' });


          var chart2 = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
          function drawChart2() {
    				// Disabling the button while the chart is drawing.
    				google.visualization.events.addListener(chart2, 'ready',
    					function () {
    					});
    				chart2.draw(data2, options2);
    			}

          for (var i = 1 ; i <= 30 ; i ++) {
            data2.addRow(['9/'+i,0, 0]);
          }
          drawChart2();

          setTimeout(function() {

            var visit2 = [1,24,18,16,20,16,4,
                         2,24,21,15,0,0,0,
                         1,17,20,28,25,20,3,
                         1,6,0,0,0,0,0,0,0];
            for (var i = 0; i < data2.getNumberOfRows(); i++) {
              data2.setValue(i,1,visit2[i]);
              data2.setValue(i,2,visit2[i]);
            }
            drawChart2();
          },2);

        }
      </script>
    </div>
    <br><br>
    <div align="center">
      <table width="80%">
        <tr><td><h2>
        <select>
          <?php
            $i =1;
            for(;$i<=30;$i++)
              echo("<option value='9/".$i."'>9/".$i."</option>\n");
          ?>
        </select> 게이트별 통계
        </h2>
        </td>
        <td align="right">
          <button type="button" class="btn btn-primary"
          style="width:100px">
          <font size="5">적용</font>
        </button>
        </td>
        </tr>
      </table>
      <hr width="90%">
      <table width="90%">
        <tr>
          <td width="50%" align = "center">
            <div id="chart_div3" style="height:300px;
              margin-top:-50px;
              padding-top:-50px;
            "></div>
            <font size="7">입장</font>
          </td>
          <td width="50%" align = "center">
            <div id="chart_div4" style="height:300px;
              margin-top:-50px;
              padding-top:-50px;
            "></div>
            <font size="7">퇴장</font>
          </td>
        </tr>
      </table>

      <script>
        google.charts.setOnLoadCallback(drawChart3);
        google.charts.setOnLoadCallback(drawChart4);

        function drawChart3() {
        var data = google.visualization.arrayToDataTable([
          ['게이트', '회 입장'],
          ['GATE_1', 5],
          ['GATE_2',  12],
          ['GATE_3',  2],
          ['GATE_4',  8]
        ]);

        var options = {
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
        };

        var chart3 = new google.visualization.PieChart(document.getElementById('chart_div3'));
        chart3.draw(data, options);
      }

      function drawChart4() {
      var data4 = google.visualization.arrayToDataTable([
        ['게이트', '회 퇴장'],
        ['GATE_1', 11],
        ['GATE_2',  2],
        ['GATE_3',  7],
        ['GATE_4', 2]
      ]);

      var options4 = {
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
      };

      var chart4 = new google.visualization.PieChart(document.getElementById('chart_div4'));
      chart4.draw(data4, options4);
    }
      </script>
    </div>
<center>
    <!-- FOOTER PART -->
    <br><br><br>
    <table width="90%" height="100px">
      <tr><td bgcolor="#ebebeb" width="100%">
        <center>
          <font size="5" color="white">2019 한정희 교수님 종합설계 프로젝트
          <br>정지원 이승준 김영찬 안종화</font>
        </center>
      </tr></td>
    </table>
    <br>
</center>
  <div id="sideMenu" class="modal">
    <div class="modal-content">
        <center>
          <font size="7" color="white">메인 메뉴</font><br><br>
          <div id="menu01">
            <img src = "./img/menu/01.png" width="256"><br>
            <font size="5" color="white">등급 관리</font>
          </div>
          <script>
            var menuBtn01 = document.getElementById('menu01');
            menuBtn01.onclick = function () {
              alert("m btn 1");
            }
          </script>
<br>
          <div id="menu02">
            <img src = "./img/menu/02.png" width="256"><br>
            <font size="5" color="white">회원 관리</font>
          </div>
          <script>
            var menuBtn02 = document.getElementById('menu02');
            menuBtn02.onclick = function () {
              alert("m btn 2");
            }
          </script>
<br>
          <div id="menu03">
            <img src = "./img/menu/03.png" width="256"><br>
            <font size="5" color="white">전체 현황</font>
          </div>
          <script>
            var menuBtn03 = document.getElementById('menu03');
            menuBtn03.onclick = function () {
              window.location.href = "./mainPage.php?user=<?= $userName; ?>";
            }
          </script>
<br>
          <div id="menu04">
            <img src = "./img/menu/04.png" width="256"><br>
            <font size="5" color="white">개인 현황</font>
          </div>
          <script>
            var menuBtn04 = document.getElementById('menu04');
            menuBtn04.onclick = function () {
              window.location.href = "./userPage.php?user=<?= $userName; ?>";
            }
          </script>
<br>
          <div id="menu05">
            <img src = "./img/menu/05.png" width="256"><br>
            <font size="5" color="white">로그아웃</font>
          </div>
          <script>
            var menuBtn05 = document.getElementById('menu05');
            menuBtn05.onclick = function () {
              window.location.href ="./index.html";
            }
          </script>
        </center>
    </div>
  </div>

  <script>
  var btn = document.getElementById('menuBtn');
  var sideMenu = document.getElementById('sideMenu');

  btn.onclick = function() {
    sideMenu.style.display = "block";
  }

  window.onclick = function(event) {
    if (event.target == sideMenu){
      sideMenu.style.display = "none";
    }
  }
  </script>

  </body>
</html>
