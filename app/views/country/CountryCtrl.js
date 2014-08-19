viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// individual country details
	$routeProvider.when( '/countries/:countryCode', {
		templateUrl: 'views/country/country.html',
		controller: 'CountryCtrl',
		controllerAs: 'vm',

		resolve: {
			country: [ 'getCountryInfo', '$route', function( getCountryInfo, $route ) {
				return getCountryInfo( $route.current.params.countryCode );
			}]
		}
	});
}]);


viewsModule.controller( 'CountryCtrl', [ 'country',
                               function(  country ) {

	var vm = this;

	vm.country = country;

}]);
