var authN =angular.module('Authentication')

authN.factory('authNService' , ['base64', '$http', '$cookieStore', '$rootScope', '$timeout',
	function (base64, $http, $cookieStore, $rootScope, $timeout) {
		var service = {};

		service.Login = function (username, password, callback) {

			//Mock Login
			// $timeout(function() {
			// 	var response =  { success: username === 'sergio' && password === 'test'}
			// 	if (!response.success) {
			// 		response.message = 'Incorrect Username or Password';
			// 	}
			// 	callback(response);
			// }, 1000);

			/* Use this for real authentication
             ----------------------------------------------*/
            $http({
            	method:'POST',
            	url: 'https://localhost:8443/OSCARS_MPC/login',
            	headers: {'Content-Type':'application/json'},
            	data: { user: username, pass: password}
            }).success(function (response) {
                   callback(response)
               });

		};

		service.SetCredentials = function (username, password) {
			var authdata = base64.encode(username + ':' + password);

			$rootScope.globals = {
				currentUser: {
					username: username,
					authdata: authdata
				}
			};

			$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
			$cookieStore.put('globals', $rootScope.globals);
		};

		service.ClearCredentials = function () {
			$rootScope.globals ={};
			$cookieStore.remove('globals');
			$http.defaults.headers.common.Authorization = 'Basic ';
		};

		return service;

	}]);