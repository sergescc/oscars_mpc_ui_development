angular.module('User')
.controller('userCtrl', [ '$scope', '$http' , '$routeParams', function ($scope, $http, $routeParams) {


	$scope.username = $routeParams.username;

}]);