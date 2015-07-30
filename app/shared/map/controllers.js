
angular.module('MapApp', ['uiGmapgoogle-maps'])
.controller('MapAppCtrl',['$scope', function($scope){

	$scope.map = { center: { latitude: 36, longitude: -100 }, zoom: 5 };
	$scope.styles = [ { "stylers": [ { "hue": "#00ddff" },
	 { "saturation": -70 } ] },
	 { "featureType": "road.local", "stylers": [ { "visibility": "off" } ] },
	 { "featureType": "road.arterial", "stylers": [ { "visibility": "off" } ] },
	 { "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] },
	 { "featureType": "administrative.province", "stylers": [ { "visibility": "off" } ] } ];
}])

.directive('topographyMap', function() {

	return {
		restrict: 'E',
		templateUrl: 'app/shared/map/topography-map.html',
		controller: 'MapAppCtrl'
	};
});