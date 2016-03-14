(function () {
	angular.module('xWebApp', [
	'ngTable',
	'NavBar',
	'Home',
	'Usuarios',
	'Articulos',
	'Almacenes',
	'Ingresos',
	'usuariosService',
	'articulosService',
	'almacenesService',
	'ingresosService',
	'ngRoute',
	'ui.router',
	'ui.bootstrap'])
	.config(config);
    //.run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('nav', {
				url: '/nav',
				controller: 'navBarController',
				templateUrl: 'modules/NavBar/nav.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('home', {
				url: '/home',
				controller: 'homeController',
				templateUrl: 'modules/Home/home.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('usuarios', {
				url: '/usuarios',
				controller: 'usuariosController',
				templateUrl: 'modules/Usuarios/usuarios.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('articulos', {
				url: '/articulos',
				controller: 'articulosController',
				templateUrl: 'modules/Articulos/articulos.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('almacenes', {
				url: '/almacenes',
				controller: 'almacenesController',
				templateUrl: 'modules/Almacenes/almacenes.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('ingresos', {
				url: '/ingresos',
				controller: 'ingresosController',
				templateUrl: 'modules/Ingresos/ingresos.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			});

		$urlRouterProvider.otherwise('home');
	}

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        /*
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });*/
    }

})();