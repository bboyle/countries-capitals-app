angular.module( 'geonamesLibrary', [] )
.constant( 'GEONAMES_BASE_HREF', 'http://api.geonames.org' )
.constant( 'LIST_COUNTRIES_ENDPOINT', '/countryInfo' )
.constant( 'SEARCH_ENDPOINT', '/search' )
.constant( 'GEONAMES_USER', 'bboyle' )


// geonames API requests
.factory( 'geonamesRequest', [ '$http', '$q', 'GEONAMES_BASE_HREF', 'GEONAMES_USER',
                      function( $http,   $q,   GEONAMES_BASE_HREF,   GEONAMES_USER ) {

	return function( endpoint, params ) {
		params = params || {};
		var defer = $q.defer();

		// hardcode user and format
		params.username = GEONAMES_USER;
		params.type = 'JSON';

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


// get information about a capital city
.factory( 'getCapitalInfo', [ 'geonamesRequest', 'SEARCH_ENDPOINT',
                     function( geonamesRequest, SEARCH_ENDPOINT ) {


	return function( capitalName ) {
		return geonamesRequest( SEARCH_ENDPOINT, {
			name: capitalName,
			// Capitals only: http://www.geonames.org/export/codes.html
			featureCode: 'PPLC'
		});
	}
}])


// get country details
.factory( 'getCountryInfo', [ 'geonamesRequest', 'listCountries', 'getCapitalInfo',
                     function( geonamesRequest,   listCountries,   getCapitalInfo ) {

	var countriesByCode = {};

	return function( countryCode ) {
		if ( countriesByCode[ countryCode ]) {
			return countriesByCode[ countryCode ];
		}

		return listCountries().then(function( data ) {
			var i;
			for ( i = 0; i < data.geonames.length && data.geonames[ i ].countryCode !== countryCode; i++ );
			countriesByCode[ countryCode ] = data.geonames[ i ];

			// lookup capital information
			return getCapitalInfo( countriesByCode[ countryCode ].capital ).then(function( data ) {
				// nest the capital data in place of the existing capital name
				countriesByCode[ countryCode ].capital = data.geonames[ 0 ];
				return countriesByCode[ countryCode ];
			});
		});
	}
}])
;
