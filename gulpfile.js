var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );
var jshint = require( 'gulp-jshint' );


// jshint
gulp.task( 'lint', function() {
	return gulp.src( '*.js' )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ))
		.pipe( jshint.reporter( 'fail' ));
});


// local server
gulp.task( 'connect', [ 'test' ], function() {
	connect.server({ root: 'app/' });
});


// default task
gulp.task( 'test', [ 'lint' ] );
gulp.task( 'default', [ 'connect' ] );