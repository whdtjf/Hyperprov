var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);
var bodyParser = require('body-parser');
var GPIO = require('onoff').Gpio,
    led = new GPIO(24, 'out');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/led', function (req, res) {
    res.sendfile('led_web.html', { root: __dirname });
});
app.post('/data', function (req, res) {
    var state = req.body.led;
	console.log(req);
    if (state == 'on') {
        led.writeSync(1);
    }
    else {
        led.writeSync(0);
    }
    console.log(state);
    res.sendfile('led_web.html', { root: __dirname });
});
server.listen(8000, function () {
    console.log('Express server listenling on port ' + server.address().port);
});
