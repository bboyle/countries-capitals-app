var BUILD_FOLDER = 'build/';

var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );
var jshint = require( 'gulp-jshint' );
var usemin = require( 'gulp-usemin' );
var uglify = require( 'gulp-uglify' );
// var minifyHtml = require( 'gulp-minify-html' );
var minifyCss = require( 'gulp-minify-css' );
var rev = require( 'gulp-rev' );

// jshint
gulp.task( 'lint', function() {
	return gulp.src( '*.js' )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ))
		.pipe( jshint.reporter( 'fail' ));
});


// copy html to build
gulp.task( 'copy-html-files', function() {
	return gulp.src([
		'./app/**/*.html',
		'./app/image/*.jpg'
	], { base: './app' })
		.pipe( gulp.dest( BUILD_FOLDER ));
});


// usemin: css and js concat and compression
gulp.task( 'usemin', function() {
	return gulp.src( './app/*.html' )
		.pipe(usemin({
			css: [ minifyCss(), 'concat' ],
			// html: [ minifyHtml({ empty: true }) ],
			js: [ uglify(), rev() ]
		}))
		.pipe( gulp.dest( BUILD_FOLDER ));
});


// local server
gulp.task( 'connect', [ 'test' ], function() {
	connect.server({ root: 'build/' });
});


// default task
gulp.task( 'build', [ 'copy-html-files', 'usemin' ]);
gulp.task( 'test', [ 'lint' ]);
gulp.task( 'default', [ 'connect' ]);