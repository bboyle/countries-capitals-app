angular.module( 'countriesCapitalsApp', [ 'ngRoute' ])
.config([ '$routeProvider', function( $routeProvider ) {
	$routeProvider
	.when( '/', { templateUrl: 'views/index.html' })
	.when( '/countries', { templateUrl: 'views/countries/countries.html' })
	.otherwise({ redirectTo : '/' });
}]);
