viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// list of countries
	$routeProvider.when( '/countries', {
		templateUrl: 'views/countries/countries.html',
		controller: 'CountriesCtrl',
		controllerAs: 'vm',

		resolve: {
			countriesList: [ 'listCountries', function( listCountries ) {
				return listCountries();
			}]
		}
	});
}]);


viewsModule.controller( 'CountriesCtrl', [ 'countriesList',
                                 function(  countriesList ) {

   	var vm = this;

   	vm.countries = countriesList.geonames;

}]);
