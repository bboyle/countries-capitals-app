angular.module( 'geonamesLibrary', [] )
<<<<<<< HEAD
.constant( 'LIST_COUNTRIES_URL', 'http://api.geonames.org/countryInfo' )
.constant( 'GEONAMES_USER', 'bboyle' )


// geonames API requests
.factory( 'geonamesRequest', [ '$http', '$q', 'GEONAMES_USER',
                     function(  $http,   $q,   GEONAMES_USER ) {

	return function( url, params ) {
=======
.constant( 'GEONAMES_BASE_HREF', 'http://api.geonames.org' )
.constant( 'LIST_COUNTRIES_ENDPOINT', '/countryInfo' )
.constant( 'SEARCH_ENDPOINT', '/search' )
.constant( 'SEARCH_CODE_CAPITAL', 'PPLC' )
.constant( 'NEIGHBOURS_ENDPOINT', '/neighbours' )
.constant( 'GEONAMES_USER', 'bboyle' )


// generic request
.factory( 'geonamesRequest', [ '$http', '$q', 'GEONAMES_BASE_HREF', 'GEONAMES_USER',
function(                       $http,   $q,   GEONAMES_BASE_HREF,   GEONAMES_USER ) {

	return function( endpoint, params ) {
>>>>>>> master
		params = params || {};
		var defer = $q.defer();

		// hardcode user and format
<<<<<<< HEAD
		params.username = GEONAMES_USER;
		params.type = 'JSON';

		$http.get( url, {
=======
		angular.extend( params, {
			username: GEONAMES_USER,
			type: 'JSON',
		});

		$http.get( GEONAMES_BASE_HREF + endpoint, {
>>>>>>> master
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
<<<<<<< HEAD
.factory( 'listCountries', [ 'geonamesRequest', '$interpolate', 'LIST_COUNTRIES_URL',
                   function(  geonamesRequest,   $interpolate,   LIST_COUNTRIES_URL ) {

	return function() {
		return geonamesRequest( LIST_COUNTRIES_URL );
	}
}])
=======
.factory( 'listCountries', [ 'geonamesRequest', 'LIST_COUNTRIES_ENDPOINT',
function(                     geonamesRequest,   LIST_COUNTRIES_ENDPOINT ) {

	return function() {
		return geonamesRequest( LIST_COUNTRIES_ENDPOINT );
	}
}])


// get country details
.factory( 'getCountryInfo', [ 'geonamesRequest', 'listCountries',
function(                      geonamesRequest,   listCountries ) {

	var countriesByCode = {};

	return function( countryCode ) {
		if ( countriesByCode[ countryCode ]) {
			return countriesByCode[ countryCode ];
		}

		return listCountries().then(function( data ) {
			var i;
			for ( i = 0; i < data.geonames.length && data.geonames[ i ].countryCode !== countryCode; i++ );
			countriesByCode[ countryCode ] = data.geonames[ i ];

			return countriesByCode[ countryCode ];
		});
	};
}])


// search( name, code )
// extend a country with additional information about the capital
.factory( 'search', [ 'geonamesRequest', 'SEARCH_ENDPOINT',
function(              geonamesRequest,   SEARCH_ENDPOINT ) {

	return function( name, code ) {
		return geonamesRequest( SEARCH_ENDPOINT, {
			name: name,
			// Capitals only: http://www.geonames.org/export/codes.html
			featureCode: code
		});
	}
}])


// get neighbours( countryObject )
// returns a list of neighbouring countries
.factory( 'listNeighbours', [ 'geonamesRequest', 'NEIGHBOURS_ENDPOINT',
function(                      geonamesRequest,   NEIGHBOURS_ENDPOINT ) {

	return function( country ) {
		return geonamesRequest( NEIGHBOURS_ENDPOINT, {
			geonameId: country.geonameId
		});
	}
}])


// geonames API
.factory( 'geonames', [ 'listCountries', 'getCountryInfo', 'search', 'listNeighbours',
function(                listCountries,   getCountryInfo,   search,   listNeighbours ) {

	return ({
		'getCountry': getCountryInfo,
		'listCountries': listCountries,
		'listNeighbours': listNeighbours,
		'search': search,
	});
}])
>>>>>>> master
;
