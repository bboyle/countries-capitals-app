angular.module( 'geonamesLibrary', [] )
.constant( 'GEONAMES_BASE_HREF', 'http://api.geonames.org' )
.constant( 'LIST_COUNTRIES_ENDPOINT', '/countryInfo' )
.constant( 'SEARCH_ENDPOINT', '/search' )
.constant( 'NEIGHBOURS_ENDPOINT', '/neighbours' )
.constant( 'GEONAMES_USER', 'bboyle' )


// geonames API requests
.factory( 'geonamesRequest', [ '$http', '$q', 'GEONAMES_BASE_HREF', 'GEONAMES_USER',
                      function( $http,   $q,   GEONAMES_BASE_HREF,   GEONAMES_USER ) {

	return function( endpoint, params ) {
		params = params || {};
		var defer = $q.defer();

		// hardcode user and format
		angular.extend( params, {
			username: GEONAMES_USER,
			type: 'JSON',
		});

		$http.get( GEONAMES_BASE_HREF + endpoint, {
			params: params,
			cache: true
		})
		.success(function( data ) {
			defer.resolve( data );
		});

		return defer.promise;
	}
}])


// get list of countries
// http://www.geonames.org/export/web-services.html#countryInfo
.factory( 'listCountries', [ 'geonamesRequest', 'LIST_COUNTRIES_ENDPOINT',
                    function( geonamesRequest,   LIST_COUNTRIES_ENDPOINT ) {

	return function() {
		return geonamesRequest( LIST_COUNTRIES_ENDPOINT );
	}
}])


// get country details
.factory( 'getCountryInfo', [ 'geonamesRequest', 'listCountries',
                     function( geonamesRequest,   listCountries ) {

	var countriesByCode = {};

	return function( countryCode ) {
		if ( countriesByCode[ countryCode ]) {
			return countriesByCode[ countryCode ];
		}

		return listCountries().then(function( data ) {
			var i;
			for ( i = 0; i < data.geonames.length && data.geonames[ i ].countryCode !== countryCode; i++ );
			countriesByCode[ countryCode ] = data.geonames[ i ];
			// refactor model to support extending capital data
			countriesByCode[ countryCode ].capital = { name: countriesByCode[ countryCode ].capital };

			return countriesByCode[ countryCode ];
		});
	};
}])


// getCapitalInfo( countryObject )
// extend a country with additional information about the capital
.factory( 'getCapitalInfo', [ 'geonamesRequest', 'SEARCH_ENDPOINT',
                     function( geonamesRequest, SEARCH_ENDPOINT ) {

	return function( country ) {
		return geonamesRequest( SEARCH_ENDPOINT, {
			name: country.capital.name,
			// Capitals only: http://www.geonames.org/export/codes.html
			featureCode: 'PPLC'
		}).then(function( data ) {
			// extend country data with capital info
			angular.extend( country.capital, data.geonames[ 0 ]);
		});
	}
}])


// get neighbours( countryObject )
// returns a list of neighbouring countries
.factory( 'listNeighbours', [ 'geonamesRequest', 'NEIGHBOURS_ENDPOINT',
                     function( geonamesRequest,   NEIGHBOURS_ENDPOINT ) {

	return function( country ) {
		return geonamesRequest( NEIGHBOURS_ENDPOINT, {
			geonameId: country.geonameId
		});
	}
}])
;
