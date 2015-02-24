'use strict';
var dummyData = require('./dummydata');

/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
	res.json({
		name: 'Bob'
	});
};

exports.list = function(req, res){
	res.status(200).json(dummyData.new);
};

exports.readings = function(req, res){
	res.status(200).json(dummyData.old);
};