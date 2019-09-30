var enterance = require('./controller.js');


module.exports = function (app) {
  var GPIO = require('onoff').Gpio,
    led = new GPIO(24, 'out');


  app.get('/get_enterance/:id', function (req, res) { //GET 메소드 / 주소의 요청일때만 실행된다.
    enterance.get_enterance(req, res);
  });

  app.get('/add_barcode/:enterance', function (req, res) {

    led.writeSync(1);
    setTimeout(function () {
      led.writeSync(0);
    }, 1500);
    enterance.add_barcode(req, res);
  });

  app.get('/get_all_enterance', function (req, res) {
    enterance.get_all_enterance(req, res);
  });

  app.get('/update_enterance/:updated_timestamp', function (req, res) {
    var array = req.params.enterance.split("-");
    var state = array[0];
    if (state == "5") { //이 state에 특정한 바코드 값을 넣어 출입시 led가 켜지도록 한다
      
      led.writeSync(1);
      
      setTimeout(function () {
        led.writeSync(0);
      }, 1500);
      
    }
    else {
      led.writeSync(0);
      
    }
    enterance.update_enterance(req, res);
  });
}
