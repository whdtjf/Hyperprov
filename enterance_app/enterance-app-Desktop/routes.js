var enterance = require('./controller.js');
var sessionParser = require('express-session');

module.exports = function (app) {
<<<<<<< HEAD
  app.use(sessionParser({
    secret: 'hypershield',
    resave: true,
    saveUninitialized: true
}));


출처: https://zzdd1558.tistory.com/178 [신입 개발자]

  app.post('/',(req,res)=>{
      res.sendFile("hello!");
  });
=======
>>>>>>> 1f2da1ec93eb846b26fcda090e5d27de2d00575a

  app.get('/get_enterance/:id', function (req, res) {
    //GET 메소드 / 주소의 요청일때만 실행된다.
    enterance.get_enterance(req, res);
  });

  app.get('/add_barcode/:enterance', function (req, res) {
    enterance.add_barcode(req, res);
  });

  app.get('/get_all_enterance', function (req, res) {
    enterance.get_all_enterance(req, res);
  });

  app.get('/update_enterance/:updated_timestamp', function (req, res) {
      enterance.update_enterance(req, res);
  });
}
