
var authN = angular.module('Authentication')
	.controller('loginController', ['$scope', '$rootscope', '$location', 'AuthNService', 
		function ($scope, $rootscope, $location, AuthNService) 
		{
			AuthNService.ClearCredentials();

			$scope.login = function () {
				$scope.dataLoading = true;

				AuthNService.Login($scope.username, $scope.password, function(response) {
					if(response.sucess) {
						AuthenNService.SetCredentials($scope.username, $scope.password);
						$location.path('/');
					}
					else {
						$scope.error = response.message;
						$scope.dataLoading = false;
					}
				});
			};
		}]);
angular.module('Splash')
.controller('splashCtrl' , [ '$scope', '$http' , function ($scope , $http) {

}])
angular.module('User')
.controller('userCtrl', [ '$scope', '$http' , function ($scope, $http) {


}]);
var header = angular.module('HeaderModule')
.controller('headerCtrl', [ '$scope', function ($scope) {

	$scope.loginButton =  "Login";
	$scope.registerButton = "Register";

	$scope.toggleLogin = function()
	{
		if ($scope.loginButton === "Login")
		{
			$scope.loginButton = "Logout";
		}
		else
		{
			$scope.loginButton = "Login";
		}
	};
	$scope.toggleRegister = function() {
		if ($scope.registerButton === "Register")
		{
			$scope.registerButton = "Settings";
		}
		else
		{
			$scope.registerButton = "Register";
		}
	}
}]);

angular.module('MapApp', ['uiGmapgoogle-maps'])
.controller('MapAppCtrl',['$scope', function($scope){

	$scope.map = { center: { latitude: 40, longitude: -100 }, zoom: 5 };
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