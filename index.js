var express = require("express"),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 9000;

var config = require('./config');
var redConfig = require("./config/RED");

var mongoose = require('mongoose');
var RED = require("node-red");

mongoose.connect(config.mongo.uri, config.mongo.options);

if(config.seedDB) { require('./config/seed'); }

var clientdir = '/client';

var app = express();

var server = require('http').createServer(app);

RED.init(server,redConfig);
app.use(redConfig.httpAdminRoot,RED.httpAdmin);
app.use(redConfig.httpNodeRoot,RED.httpNode);

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + clientdir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));


server.listen(port,function(){
	console.log("Simple static server listening at http://localhost:" + port);
});

RED.start();

