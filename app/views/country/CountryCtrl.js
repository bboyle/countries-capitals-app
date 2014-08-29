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


viewsModule.controller( 'CountryCtrl', [ 'country', 'countryCapitalsModel', '$location',
                               function(  country,   countryCapitalsModel,   $location ) {

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
		maxbounds: {
			northEast: {
				lat: country.north,
				lng: country.east
			},
			southWest: {
				lat: country.south,
				lng: country.west
			}
		},
		markers: {},
		// center: {
		// 	lat: country.north - (( country.north - country.south ) / 2 ),
		// 	lng: country.east - (( country.east - country.west ) / 2 ),
		// 	zoom: 4
		// }
	};

	// lazy load capital details
	countryCapitalsModel.extendCountryInfoWithCapital( country ).then(function() {
		// place marker for capital
		var capital = vm.country.capital;

		vm.map.markers.capital = {
			lat: capital.lat,
			lng: capital.lng,
			message: capital.name
		};
	});

	// lazy load neighbours
	countryCapitalsModel.getCountryNeighbours( country ).then(function( data ) {
		vm.neighbours = data.geonames;
	});

}]);
