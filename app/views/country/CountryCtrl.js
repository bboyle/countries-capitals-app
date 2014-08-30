viewsModule.config([ '$routeProvider', function( $routeProvider ) {
	// individual country details
	$routeProvider.when( '/countries/:countryCode', {
		templateUrl: 'views/country/country.html',
		controller: 'CountryCtrl',
		controllerAs: 'vm',

		resolve: {
			country: [ 'countryCapitalsModel', '$route',
			function(   countryCapitalsModel,   $route ) {
				return countryCapitalsModel.getCountry( $route.current.params.countryCode );
			}]
		}
	});
}]);


viewsModule.controller( 'CountryCtrl', [ 'country', 'countryCapitalsModel', '$location', '$interpolate',
                               function(  country,   countryCapitalsModel,   $location,   $interpolate ) {

	// check for country data
	if ( typeof country === 'undefined' ) {
		$location.path( '/country-not-found' );
		return;
	}

	var vm = this;
	vm.country = country;

	// http://leaflet-extras.github.io/leaflet-providers/preview/
	var Esri_NatGeoWorldMap = {
		url: 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
		options: {
			attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.',
		}
	};

	// map UI
	// http://tombatossals.github.io/angular-leaflet-directive/#!/examples/simple-map
	vm.map = {
		tiles: Esri_NatGeoWorldMap,
		maxbounds: {
			northEast: { lat: country.north, lng: country.east },
			southWest: { lat: country.south, lng: country.west }
		},
		markers: {},
	};

	// lazy load capital details
	countryCapitalsModel.extendCountryInfoWithCapital( country ).then(function() {
		// place marker for capital
		var capital = vm.country.capital;
		vm.country.capitalLoaded = true;

		vm.map.markers.capital = {
			lat: capital.lat,
			lng: capital.lng,
			message: $interpolate( '{{ name }} (population {{ population | number }})' )( capital ),
			focus: true // shows message immediately
		};

		// check country bounds (e.g. capital of Equatorial Guinea is outside country bounds?)
		var bounds = angular.extend( {}, vm.map.maxbounds );

		if ( capital.lat > bounds.northEast.lat ) {
			bounds.northEast.lat = capital.lat;
		} else if ( capital.lat < bounds.southWest.lat ) {
			bounds.southWest.lat = capital.lat;
		}
		if ( capital.lng > bounds.northEast.lng ) {
			bounds.northEast.lng = capital.lng;
		} else if ( capital.lng < bounds.southWest.lng ) {
			bounds.southWest.lng = capital.lng;
		}

		vm.map.maxbounds = bounds;
	});

	// lazy load neighbours
	countryCapitalsModel.getCountryNeighbours( country ).then(function( data ) {
		vm.neighbours = data.geonames;
		vm.country.neighboursLoaded = true;
	});

}]);
