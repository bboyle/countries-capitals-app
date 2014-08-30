<<<<<<< HEAD
angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute' ])
=======
angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute', 'ngAnimate', 'leaflet-directive' ])
>>>>>>> master
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider

	// home
	.when( '/', { templateUrl: 'views/index.html' })
<<<<<<< HEAD


	// individual country details
	.when( '/countries/:code', { templateUrl: 'views/country/country.html' })


	.otherwise({ redirectTo : '/' });

=======
	.when( '/country-not-found', { templateUrl: 'views/error/countryNotFound.html' })
	.otherwise({ redirectTo : '/' });

}])

.run([ '$rootScope', function( $rootScope ) {
	$rootScope.$on( '$routeChangeStart', function() {
		$rootScope.isLoading = true;
		$rootScope.loadingPercent = 10;
	});
	$rootScope.$on( '$routeChangeSuccess', function() {
		$rootScope.isLoading = false;
		$rootScope.loadingPercent = 100;
	});

>>>>>>> master
}]);
