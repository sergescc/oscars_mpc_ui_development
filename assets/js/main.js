
//Declaring Modules

angular.module('HeaderModule', ['ui.bootstrap', 'Authentication']);
angular.module('MapApp', ['uiGmpagoogle-maps'])
angular.module('Authentication', ['angular-crypto'] );
angular.module('User', []);
angular.module('Admin', []);
angular.module('Splash', ['MapApp']);



angular.module('OscarsMPC', [ 
	'HeaderModule', 
	'Authentication', 
	'User', 
	'Admin',
	'Splash', 
	'ngRoute', 
	'ngCookies'])
.config(['$routeProvider',function ($routeProvider) {

	$routeProvider
		.when ('/splash', {
			templateUrl: 'app/components/splash/splash.html',
			controller: 'splashCtrl'
		})
		.when ('/user/:username', {
			templateUrl: 'app/components/user/user.html',
			controller: 'userCtrl'
		})
		.when ('/user/:username/admin', {
			templateUrl: 'app/components/admin/admin.html',
			controller: 'adminCtrl'
		})
		.otherwise({redirectTo : '/splash'});
}])
.run(['$rootScope','$location', '$cookieStore', '$http', 
	function ($rootScope, $location, $cookieStore, $http)
	{
		$rootScope.globals = $cookieStore.get('globals') || {};
		if ($rootScope.globals.currentUser)
		{
			$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {

			if ($location.path() != '/splash' && !$rootScope.globals.currentUser)
			{
				$location.path('/splash');
			}

		});
	}]);



