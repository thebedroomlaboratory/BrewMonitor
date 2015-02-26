'use strict';

var gulp = require('gulp');
var mongoose = require('mongoose');
var server = require('./server');
var BrewMonitor = require('./server/brewmonitor/brew.model');
var dummyData = require('./server/brewmonitor/dummydata');

/**
 *
 * command : gulp copy
 * basic gulp copy task
 * copies all static files from client to dev
 * This is just a basic step towards a build
 * which will include minifying, uglifying, browserify/webpack, less/sass and etc...
 * */
gulp.task('copy', function(){
    gulp.src([
        'client/**/*'])
        .pipe(gulp.dest('dev'));

});

/**
 * command : gulp
 * default gulp task
 * runs the copy task then starts the server
 * This will later allow us to pass parameters to server to account for environment
 */
gulp.task('default',['copy'], function(){
    server();
});

gulp.task('populateDB', function(){
	mongoose.connect('mongodb://localhost/brewmonitor', function(err){
		var data = dummyData.new;
		for(var i = 0, len = data.length; i < len; i++){
			var reading = new BrewMonitor();
			reading.devid = data[i].devid;
			reading.temps = data[i].temps;
			reading.userid = data[i].userid;
			reading.save(function(err){
				if(err) console.error('Error inserting', err);
				if(i+1 == len){
					mongoose.connection.close(function(err){
						if(err) console.log('DB Population Error', err);
						else console.log('DB Populated');

					});
				}
			});
		}
	});


});