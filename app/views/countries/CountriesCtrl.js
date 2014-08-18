angular.module( 'countriesCapitalsApp' )

.controller( 'CountriesCtrl', function() {

   	var ctrl = this;

	ctrl.countries = [{
		'Name': 'Afghanistan',
		'Code': 'AF',
		'Capital': 'Kabul',
		'Area': '647,500',
		'Population': '2,912,286',
		'Continent': 'AS',
	}, {
		'Name': 'Albania',
		'Code': 'AL',
		'Capital': 'Tirana',
		'Area': '28,740',
		'Population': '2,986,952',
		'Continent': 'EU',
	}, {
		'Name': 'Zimbabwe',
		'Code': 'ZW',
		'Capital': 'Harare',
		'Area': '390,580',
		'Population': '11,651,000',
		'Continent': 'AF',
	}];

});
