viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// individual country details
	$routeProvider.when( '/countries/:code', {
		templateUrl: 'views/country/country.html',
		controller: 'CountryCtrl',
		controllerAs: 'vm',

		resolve: {
			countries: [ 'listCountries', function( listCountries ) {
				return listCountries();
			}],
			countryCode: [ '$route', function( $route ) {
				return $route.current.params.code;
			}]
		}
	});
}]);


viewsModule.controller( 'CountryCtrl', [ 'countries', 'countryCode',
                                 function(  countries,   countryCode ) {

   	var vm = this;

   	// find country
   	var i;
   	for ( i = 0; i < countries.geonames.length && countries.geonames[ i ].countryCode !== countryCode; i++ );

   	console.log( countries.geonames.length, i, countries.geonames[ i ] );
   	vm.country = countries.geonames[ i ];

}]);
