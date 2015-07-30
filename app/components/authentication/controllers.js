
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