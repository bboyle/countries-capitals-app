angular.module( 'countryCapitalsAppModel', [ 'geonamesLibrary' ] )

// getCapitalInfo( countryObject )
// extend a country with additional information about the capital
.factory( 'countryCapitalsModel', [ 'geonames', 'SEARCH_CODE_CAPITAL', '$q',
                           function( geonames,   SEARCH_CODE_CAPITAL,   $q ) {

	return ({
		listCountries: function() {
			return geonames.listCountries();
		},
		getCountry: function( countryCode ) {
			return geonames.getCountry( countryCode ).then(function( country ) {
				// prep for extending capital info
				if ( typeof country === 'object' && country.capital ) {
					country.capital = { name: country.capital };
				}
				return country;
			});
		},
		extendCountryInfoWithCapital: function( country ) {
			if ( ! country.capital ) {
				return $q.defer().promise;
			}
			return geonames.search( country.capital.name, SEARCH_CODE_CAPITAL ).then(function( data ) {
				// parse lat/long as floats
				data.geonames[ 0 ].lat = parseFloat( data.geonames[ 0 ].lat );
				data.geonames[ 0 ].lng = parseFloat( data.geonames[ 0 ].lng );
				angular.extend( country.capital, data.geonames[ 0 ]);
			});
		},
		getCountryNeighbours: function( country ) {
			return geonames.listNeighbours( country );
		}
	});
}])
;
