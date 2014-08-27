viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// individual country details
	$routeProvider.when( '/countries/:countryCode', {
		templateUrl: 'views/country/country.html',
		controller: 'CountryCtrl',
		controllerAs: 'vm',

		resolve: {
			country: [ 'countryCapitalsModel', '$route',
			function(   countryCapitalsModel,   $route ) {
				return countryCapitalsModel.getCountry( $route.current.params.countryCode );
			}]
		}
	});
}]);


viewsModule.controller( 'CountryCtrl', [ 'country', 'countryCapitalsModel',
                               function(  country,   countryCapitalsModel ) {

	var vm = this;
	vm.country = country;

	// lazy load capital details
	countryCapitalsModel.extendCountryInfoWithCapital( country );

	// lazy load neighbours
	countryCapitalsModel.getCountryNeighbours( country ).then(function( data ) {
		vm.neighbours = data.geonames;
	});

}]);
