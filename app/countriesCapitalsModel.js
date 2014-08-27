angular.module( 'countryCapitalsAppModel', [ 'geonamesLibrary' ] )

// getCapitalInfo( countryObject )
// extend a country with additional information about the capital
.factory( 'countryCapitalsModel', [ 'geonames', 'SEARCH_CODE_CAPITAL',
                           function( geonames,   SEARCH_CODE_CAPITAL ) {

	return ({
		listCountries: function() {
			return geonames.listCountries();
		},
		getCountry: function( countryCode ) {
			return geonames.getCountry( countryCode ).then(function( country ) {
				// prep for extending capital info
				country.capital = { name: country.capital };
				return country;
			});
		},
		extendCountryInfoWithCapital: function( country ) {
			return geonames.search( country.capital.name, SEARCH_CODE_CAPITAL ).then(function( data ) {
				angular.extend( country.capital, data.geonames[ 0 ]);
			});
		},
		getCountryNeighbours: function( country ) {
			return geonames.listNeighbours( country );
		}
	});
}])
;
