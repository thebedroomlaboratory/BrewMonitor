'use strict';

var gulp = require('gulp');

var server = require('./server');

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
})