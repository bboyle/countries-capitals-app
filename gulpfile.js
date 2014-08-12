var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );


// local server
gulp.task( 'connect', function() {
	connect.server({ root: 'app/' });
});


// default task
gulp.task( 'default', [ 'connect' ]);