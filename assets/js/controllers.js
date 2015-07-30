
var authN = angular.module('Authentication')
	.controller('loginController', ['$scope', '$rootScope', '$location', 'authNService', '$modalInstance', '$location', 
		function ($scope, $rootScope, $location, authNService, $modalInstance, $location ) 
		{
			
			$scope.username = "";
			$scope.password = "";
			$scope.isError = false;
			$scope.error;

			authNService.ClearCredentials();

			$scope.login = function () {
				
				$scope.dataLoading = true;

				authNService.Login($scope.username, $scope.password, function(response) {
					if(response.success) {
						authNService.SetCredentials($scope.username, $scope.password);
						$location.path('/user/'+$scope.username);
						$modalInstance.close();
					}
					else {
						$scope.isError = true;
						$scope.error = response.message;
						$scope.dataLoading = false;
						$location.path('/spash');
					}
				});
			}

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};			

		}]);
angular.module('Splash')
.controller('splashCtrl' , [ '$scope', '$http' , function ($scope , $http) {

}])
angular.module('User')
.controller('userCtrl', [ '$scope', '$http' , '$routeParams', function ($scope, $http, $routeParams) {


	$scope.username = $routeParams.username;

}]);
var header = angular.module('HeaderModule')
.controller('headerCtrl', [ '$scope','$modal','$location','authNService','$rootScope',
 function ($scope, $modal, $location, authNService, $rootScope) {

 	$scope.loginButton;
	$scope.registerButton;


	if (!$rootScope.globals.currentUser)
	{
		$scope.loginButton = "Login";
		$scope.registerButton = "Register";
	}
	else
	{
		$scope.loginButton = "Logout";
		$scope.registerButton = "Settings";
	}



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

	$scope.animationsEnabled = true;

	$scope.loginClick = function (){
		if ($scope.loginButton === "Login")
		{
			$scope.open('sm');
		}
		else 
		{
			authNService.ClearCredentials();
			$scope.toggleLogin();
			$scope.toggleRegister();
			$location.path('/splash');
		}
	};

	$scope.registerClick = function () {};

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'app/components/authentication/loginModal.html',
			controller: 'loginController',
			size: size,
			resolve: {

				}
		});

		modalInstance.result.then(function() {
		$scope.toggleLogin();
		$scope.toggleRegister();
		
	}, function() {
		authNService.ClearCredentials();
		$location.path('/splash')
	});
	};



}]);

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