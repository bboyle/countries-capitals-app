angular.module( 'geonamesLibrary', [] )
.constant( 'LIST_COUNTRIES_URL', 'http://api.geonames.org/countryInfo' )
.constant( 'GEONAMES_USER', 'bboyle' )


// geonames API requests
.factory( 'geonamesRequest', [ '$http', '$q', 'GEONAMES_USER',
                     function(  $http,   $q,   GEONAMES_USER ) {

	return function( url, params ) {
		params = params || {};
		var defer = $q.defer();

		// hardcode user and format
		params.username = GEONAMES_USER;
		params.type = 'JSON';

		$http.get( url, {
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
.factory( 'listCountries', [ 'geonamesRequest', '$interpolate', 'LIST_COUNTRIES_URL',
                   function(  geonamesRequest,   $interpolate,   LIST_COUNTRIES_URL ) {

	return function() {
		return geonamesRequest( LIST_COUNTRIES_URL );
	}
}])
;
