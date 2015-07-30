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