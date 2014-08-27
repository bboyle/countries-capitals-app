viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// list of countries
	$routeProvider.when( '/countries', {
		templateUrl: 'views/countries/countries.html',
		controller: 'CountriesCtrl',
		controllerAs: 'vm',

		resolve: {
			countriesList: [ 'countryCapitalsModel', function( countryCapitalsModel ) {
				return countryCapitalsModel.listCountries();
			}]
		}
	});
}]);


viewsModule.controller( 'CountriesCtrl', [ 'countriesList', '$timeout',
function(                                   countriesList,   $timeout ) {

   	var vm = this;
   	vm.countries = [];

   	// delay countries data (required to trigger ngrepeat animation when view loads)
   	$timeout(function() {
		vm.countries = countriesList.geonames;
   	}, 1 );

}]);
