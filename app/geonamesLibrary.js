angular.module( 'geonamesLibrary', [] )
.constant( 'LIST_COUNTRIES_URL', 'http://api.geonames.org/countryInfo?username={{ username }}&type=JSON' )
.constant( 'GEONAMES_USER', 'bboyle' )


// geonames API requests
.factory( 'geonamesRequest', [ '$http', '$interpolate', '$q', 'GEONAMES_USER',
                     function(  $http,   $interpolate,   $q,   GEONAMES_USER ) {

	return function( url ) {
		var defer = $q.defer();
		url = $interpolate( url, { username: GEONAMES_USER });

		$http.get( API_URL )
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
