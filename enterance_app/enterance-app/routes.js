//SPDX-License-Identifier: Apache-2.0

var enterance = require('./controller.js');


module.exports = function (app) {
  var GPIO = require('onoff').Gpio,
  led = new GPIO(24, 'out');

  
  app.get('/get_enterance/:id', function (req, res) { //GET 메소드 / 주소의 요청일때만 실행된다.
    enterance.get_enterance(req, res);
  });

  app.get('/add_barcode/:enterance', function (req, res) {
    console.log(req);
    var state = req.body.led;
    if (state == 'Create') {
      led.writeSync(1);
      console.log("on");
    }
    else {
      led.writeSync(0);
    }
    // res.sendfile('./client/index.html', { root: __dirname });

    enterance.add_barcode(req, res);
  });

  app.get('/get_all_enterance', function (req, res) {
    enterance.get_all_enterance(req, res);
  });

  app.get('/update_enterance/:updated_timestamp', function (req, res) {
    enterance.update_enterance(req, res);
  });
}


/*   app.get('/led', function (req, res) {
    res.sendfile('./client/index.html', { root: __dirname });
  });
  app.post('/data', function (req, res) {
    var state = req.body.led;
    if (state == 'Create') {
      led.writeSync(1);
      console.log("on");
    }
    else {
      led.writeSync(0);
    }
    res.sendfile('./client/index.html', { root: __dirname });
  });
} */

