'use strict';

/**
* Imports
**/

var gulp = require('gulp');
var debug = require('gulp-debug');
var rimraf = require('gulp-rimraf');
var bower = require('main-bower-files');
var filter = require('gulp-filter');
var watch = require('gulp-watch');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var reload = require('gulp-livereload');

/**
* Vars
**/

var paths = {
	src : './src',
	dest : './dest',
};

var files = {
	index : {
		src: paths.src + '/index.html',
		dest: paths.dest
	},
	css : {
		src: paths.src + '/app/css/style.css',
		dest: paths.dest + '/css'
	},
	angular: {
		home : paths.src + '/app'
	}
};

var bowerConfig = {
	overrides: {
		bootstrap: {
			main: [ 'dist/css/bootstrap.min.css' ]
		},
		jquery: {
			main: []
		},
		angular: {
			main: ['angular.min.js']
		}
	}
};

/**
* Tasks
**/

gulp.task('clean', function(){

	return gulp.src( paths.dest, {read: false} )
		.pipe( rimraf() );

});

gulp.task('init', function(){

	var index = gulp.src( files.index.src )
		.pipe( gulp.dest( files.index.dest ) )
		.pipe( reload() );

	var css = gulp.src( files.css.src )
		.pipe( gulp.dest( files.css.dest ) );

	return merge( index, css );

});

gulp.task('bower:css', function(){

	return gulp.src( bower(bowerConfig) )
		.pipe( filter('**/*.css') )
		.pipe( gulp.dest( paths.dest + '/css' ) );

});

gulp.task('bower:js', function(){

	return gulp.src( bower(bowerConfig) )
		.pipe( filter('**/*.js') )
		.pipe( gulp.dest( paths.dest + '/js' ) );

});

gulp.task('angular', function(){

	var modules = gulp.src( files.angular.home + '/**/*.module.js' )
		.pipe( concat( '/js/modules.js' ) )
		.pipe( gulp.dest( paths.dest ) );

	var services = gulp.src( files.angular.home + '/**/*.service.js' )
		.pipe( concat( '/js/services.js' ) )
		.pipe( gulp.dest( paths.dest ) );

	var controllers = gulp.src( files.angular.home + '/**/*.controller.js' )
		.pipe( concat( '/js/controllers.js' ) )
		.pipe( gulp.dest( paths.dest ) );

	// var templates = gulp.src( file.angular.home + '/**/*.tmpl.html' )
	// 	.pipe( gule.dest( paths.dest + '/html' ) );

	return merge( modules, services, controllers ).pipe(reload());

});

/**
* Main
**/

gulp.task('default', ['clean'], function(){

	gulp.start( 'init', 'bower:css', 'bower:js', 'angular' );
	
});

gulp.task('watch', ['default'], function(){

	reload.listen();

	watch( [files.index.src, files.css.src], function(){
		gulp.start( 'init' );
	} );

	watch( files.angular.home + '/**/*.js', function(){
		gulp.start( 'angular' );
	} );

});















