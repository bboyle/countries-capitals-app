angular.module( 'countriesCapitalsApp', [ 'ngRoute' ])
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider

	// home
	.when( '/', { templateUrl: 'views/index.html' })

	// list of countries
	.when( '/countries', {
		templateUrl: 'views/countries/countries.html',
		controller: 'CountriesCtrl',
		controllerAs: 'countries'
	})

	// individual country details
	.when( '/countries/:code', { templateUrl: 'views/country/country.html' })

	.otherwise({ redirectTo : '/' });

}]);
