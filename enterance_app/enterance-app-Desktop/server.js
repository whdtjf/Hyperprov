//SPDX-License-Identifier: Apache-2.0

// nodejs server setup 

// call the packages we need
var express       = require('express');        // call express
var app           = express();                 // define our app using express
var bodyParser    = require('body-parser');
var http          = require('http')
var fs            = require('fs');
var Fabric_Client = require('fabric-client');
var path          = require('path');
var util          = require('util');
var os            = require('os');

// instantiate the app
var app = express();


// Load all of our middleware
// configure app to use bodyParser()
// this will let us get the data from a POST
//interprete the main body contents
// app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); //

app.get('/client/test', (req,res) => {
  res.sendfile('./client/test.html')
})

app.post( '/login',(req,res) => {
  res.send("result ..."+req.body.id);
});

// this line requires and runs the code from our routes.js file and passes it app
require('./routes.js')(app);

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

// Save our port
var port = process.env.PORT || 8000;

// Start the server and listen on port 
app.listen(port,function(){
  console.log("Live on port: " + port);
});

