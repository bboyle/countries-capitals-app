angular.module( 'countriesCapitalsApp', [ 'countryCapitalsAppViews', 'ngRoute', 'ngAnimate' ])
.config([ '$routeProvider', function( $routeProvider ) {

	$routeProvider
	.when( '/', { templateUrl: 'views/index.html' })
	.otherwise({ redirectTo : '/' });

}])

.run([ '$rootScope', function( $rootScope ) {
	// $rootScope.$on( '$routeChangeError', function() {
	// 	$rootScope.isLoading = false;
	// 	$location.path( '/error' );
	// });

	$rootScope.$on( '$routeChangeStart', function() {
		$rootScope.isLoading = true;
		$rootScope.loadingPercent = 10;
		console.log( 'routeChangeStart', $rootScope.isLoading, $rootScope.loadingPercent );
	});
	$rootScope.$on( '$routeChangeSuccess', function() {
		$rootScope.isLoading = false;
		$rootScope.loadingPercent = 100;
		console.log( 'routeChangeSuccess', $rootScope.isLoading, $rootScope.loadingPercent );
	});

}]);
