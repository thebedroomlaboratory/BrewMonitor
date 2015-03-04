'use strict';

/**
 * Module dependencies
 */

var express = require('express'),
	mongoose = require ("mongoose"),
	bodyParser = require('body-parser'),
	//methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	logger = require('morgan'),

	http = require('http'),
	path = require('path');

mongoose.connect('mongodb://localhost/brewmonitor');

var brewApi = require('./brewmonitor');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var env = process.env.NODE_ENV || 'development';
console.log('env', env);

// development only
if (env === 'development') {
	app.use(express.static(path.join(__dirname, '..', 'dev')));
	app.use(errorHandler());
}

// production only
if (env === 'production') {
	// TODO
}


/**
 * Routes
 */

// JSON API
app.get('/brewmonitor/api/list', brewApi.list);
app.get('/brewmonitor/api/readings', brewApi.readings);
app.post('/brewmonitor/api/add', brewApi.add);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);


/**
 * Start Server
 */
module.exports = function() {
	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});
}