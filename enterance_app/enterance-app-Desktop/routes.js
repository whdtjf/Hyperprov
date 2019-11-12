var enterance = require('./controller.js');

module.exports = function (app) {

  app.set('view engine','ejs');
  app.post( '/loginProcess',(req,res) => {
    res.render(__dirname+'/client/loginProcess.ejs',{id:req.body.id});
  });

  app.set('view engine','ejs');
  app.get('/mainPage', (req,res) => {
    res.render(__dirname+'/client/mainPage.ejs');
  });

  app.set('view engine','ejs');
  app.get('/dailyLog', (req,res) => {
    res.render(__dirname+'/client/dailyLog.ejs');
  });

  app.get('/monthlyLog', (req,res) => {
    res.render(__dirname+'/client/monthlyLog.ejs');
  });
}
