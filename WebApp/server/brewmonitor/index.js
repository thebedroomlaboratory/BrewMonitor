'use strict';
var dummyData = require('./dummydata');
var Brew = require('./brew.model');
var logger = require('../logger');

/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
	logger.info('Bob');
	res.json({
		name: 'Bob'
	});
};

exports.add = function (req, res){
	console.log('req.body', req.body);

	//res.status(200).json({'a':123});
	var brew = new Brew(req.body);
	console.log('Boom');
	brew.save(function(err, brew){
		console.log('Saved');
		if(err){
			logger.error(err);
			res.status(500).json({error : 'Could not be saved, please check the logs'});
		}
		else{
			logger.info(err);
			res.status(200).json(brew);
		}
	});
};

exports.list = function(req, res){
	res.status(200).json(dummyData.new);
};

exports.readings = function(req, res){
	res.status(200).json(dummyData.old);
};