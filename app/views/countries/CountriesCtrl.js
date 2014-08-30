viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// list of countries
	$routeProvider.when( '/countries', {
		templateUrl: 'views/countries/countries.html',
		controller: 'CountriesCtrl',
<<<<<<< HEAD
		controllerAs: 'countries',

		resolve: {
			countriesList: [ 'listCountries', function( listCountries ) {
				return listCountries();
=======
		controllerAs: 'vm',

		resolve: {
			countriesList: [ 'countryCapitalsModel', function( countryCapitalsModel ) {
				return countryCapitalsModel.listCountries();
>>>>>>> master
			}]
		}
	});
}]);


<<<<<<< HEAD
viewsModule.controller( 'CountriesCtrl', [ 'countriesList',
                                 function(  countriesList ) {

   	var vm = this;

   	vm.countries = countriesList.geonames;
=======
viewsModule.controller( 'CountriesCtrl', [ 'countriesList', '$timeout',
function(                                   countriesList,   $timeout ) {

	var vm = this;

	vm.allCountries = countriesList.geonames;

	vm.pagination = {
		start: 0,
		page: 20, // results per page
		showPrevious: false,
		showNext: false,

		next: function() {
			if ( this.start + this.page < vm.allCountries.length ) {
				this.start += this.page;
			}
			vm.refresh();
		},
		previous: function() {
			if ( this.start > 0 ) {
				this.start -= this.page;
			}
			vm.refresh();
		}
	}

	vm.refresh = function() {
		if ( this.pagination.start + this.pagination.page < this.allCountries.length ) {
			this.pagination.showNext = true;
		}
		if ( this.pagination.start > 0 ) {
			this.pagination.showPrevious = true;
		}
		this.countries = this.allCountries.slice( this.pagination.start, this.pagination.start + this.pagination.page );
	};


	vm.countries = [];

	// delay countries data (required to trigger ngrepeat animation when view loads)
	$timeout(function() {
		vm.refresh();
	}, 1 );
>>>>>>> master

}]);
