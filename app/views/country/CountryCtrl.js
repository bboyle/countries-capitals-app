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


viewsModule.controller( 'CountryCtrl', [ 'country', 'getCapitalInfo', 'listNeighbours',
                               function(  country,   getCapitalInfo,   listNeighbours ) {

	var vm = this;

	vm.country = country;

	// lazy load capital details
	getCapitalInfo( country );

	// lazy load neighbours
	listNeighbours( country ).then(function( data ) {
		vm.neighbours = data.geonames;
	});

}]);
