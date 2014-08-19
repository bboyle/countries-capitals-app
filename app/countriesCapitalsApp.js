angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute' ])
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider

	// home
	.when( '/', { templateUrl: 'views/index.html' })


	// individual country details
	.when( '/countries/:code', { templateUrl: 'views/country/country.html' })


	.otherwise({ redirectTo : '/' });

}]);
