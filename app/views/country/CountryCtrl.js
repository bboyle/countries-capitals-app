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
			attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
		}
	};

	// map UI
	// http://tombatossals.github.io/angular-leaflet-directive/#!/examples/simple-map
	vm.map = {
		tiles: Esri_NatGeoWorldMap,
		// debugging country bounds
		// paths: {
		// 	bounds: {
		// 		color: 'rgba( 255, 255, 255, .5 )',
		// 		weight: 8,
		// 		latlngs: [
		// 			{ lat: country.north, lng: country.east },
		// 			{ lat: country.south, lng: country.east },
		// 			{ lat: country.south, lng: country.west },
		// 			{ lat: country.north, lng: country.west },
		// 			{ lat: country.north, lng: country.east }
		// 		]
		// 	}
		// },
		maxbounds: {
			northEast: { lat: country.north, lng: country.east },
			southWest: { lat: country.south, lng: country.west }
		},
		markers: {
			// debugging country bounds
			// ne: { lat: country.north, lng: country.east, message: 'NorthEast: ' + country.north + ',' + country.east },
			// se: { lat: country.south, lng: country.east, message: 'SouthEast: ' + country.south + ',' + country.east },
			// sw: { lat: country.south, lng: country.west, message: 'SouthWest: ' + country.south + ',' + country.west },
			// nw: { lat: country.north, lng: country.west, message: 'NorthWest: ' + country.north + ',' + country.west },
		},
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
		// debugging country bounds
		// vm.map.paths.bounds.latlngs = [
		// 	{ lat: bounds.northEast.lat, lng: bounds.northEast.lng },
		// 	{ lat: bounds.southWest.lat, lng: bounds.northEast.lng },
		// 	{ lat: bounds.southWest.lat, lng: bounds.southWest.lng },
		// 	{ lat: bounds.northEast.lat, lng: bounds.southWest.lng },
		// 	{ lat: bounds.northEast.lat, lng: bounds.northEast.lng }
		// ]
	});

	// lazy load neighbours
	countryCapitalsModel.getCountryNeighbours( country ).then(function( data ) {
		vm.neighbours = data.geonames;
		vm.country.neighboursLoaded = true;
	});

}]);
