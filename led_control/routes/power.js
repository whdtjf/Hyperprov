var express = require('express');
var router = express.Router();
var onoff = require('onoff');

var Gpio = onoff.Gpio;
var power = new Gpio(24, 'out');

/* GET users listing. */
router.get('/', function(req, res, next) {
        var status = power.readSync();
        res.send( { status : status });
});
router.put('/', function(req, res) {
        var status = req.body.status;

        console.log("status : " + status);

        if(status == 0) {
                power.writeSync(0);
        }
        else if(status == 1) {
                power.writeSync(1);
        }
        res.send();
});
module.exports = router;
