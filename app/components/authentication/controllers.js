
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