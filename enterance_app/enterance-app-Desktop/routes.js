var enterance = require('./controller.js');

module.exports = function (app) {

  app.set('view engine','ejs');
  app.post( '/loginProcess',(req,res) => {
    res.render(__dirname+'/client/loginProcess.ejs',{id:req.body.id});
  });

  app.set('view engine','ejs');
  app.get('/mainPage', (req,res) => {
    console.log(req.session.uID);
    res.sender(req.session.uID);
  });

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
