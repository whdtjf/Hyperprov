<html>
  <head>
    <link rel="stylesheet" href="bootstrap-3.3.2-dist/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
