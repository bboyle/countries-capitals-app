angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute', 'ngAnimate' ])
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider
	.when( '/', { templateUrl: 'views/index.html' })
	.otherwise({ redirectTo : '/' });

}]);
