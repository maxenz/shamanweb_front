angular.module('app', [
	'ngTouch',
	'ngRoute',
    'chart.js',
    'blockUI',
    'ngCookies',
    'ngwidgets',
    'ui.bootstrap',
    'ngMap'
])


.constant('CONFIG_INFO', {
    baseUrl: 'http://localhost/Shaman.Web/'
})
.config(['$routeProvider', 'blockUIConfig', '$httpProvider', function ($routeProvider, blockUIConfig, $httpProvider) {

    blockUIConfig.message = 'Por favor, aguarde un instante...';

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $routeProvider.

	when('/', {
	    templateUrl: 'app/views/home.html',
	    controller: 'HomeCtrl'
	}).
	when('/panel', {
	    templateUrl: 'app/views/operativePanel.html',
	    controller: 'OperativePanelController'
	}).
    when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginController'
    }).
    when('/datatables', {
        templateUrl: 'app/views/datatable.html',
        controller: 'DatatableCtrl'
    }).
	otherwise({
	    redirectTo: '/'
	});
}])
 .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        //if ($rootScope.globals.currentUser) {
        //    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        //}

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);