angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute', 'ngAnimate' ])
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider
	.when( '/', { templateUrl: 'views/index.html' })
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

}]);
