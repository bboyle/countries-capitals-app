angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute' ])
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider
	.when( '/', { templateUrl: 'views/index.html' })
	.otherwise({ redirectTo : '/' });

}]);
