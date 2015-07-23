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