
//Declaring Modules

angular.module('HeaderModule', []);
angular.module('MapApp', ['uiGmpagoogle-maps'])
angular.module('Authentication', [] );
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
.config(['$routeProvider', function ($routeProvider) {

	$routeProvider
		.when ('/', {
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
		.otherwise({redirectTo : '/'});
}]);



