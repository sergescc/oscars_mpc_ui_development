var authN =angular.module('Authentication')

authN.factory('authNService' , ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
	function (Base64, $http, $cookieStore, $rootScope, $timeout) {
		var service = {};

		service.Login = function (username, password, callback) {

			//Mock Login
			$timeout(function() {
				var response =  { success: username === 'sergio' && password === 'test'}
				if (!response.success) {
					response.message = 'Username or password is incorrect';
				}
				callback(response);
			}, 1000);

			/* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

		};

		service.SetCredentials = function (username, password) {
			var authdata = Base64.encode(username + ':' + password);

			$rootScope.globals = {
				currentUser: {
					username: username,
					authdata: authdata
				}
			};

			$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
			$cookiStore.put('globals', $rootScope.globals);
		};

		sevice.ClearCredentials = function () {
			rootScope.globals ={};
			$cookieStore.remove('globals');
			$httpe.defaults.headers.common.Authorization = 'Basic ';
		};

		return service;

	}]);