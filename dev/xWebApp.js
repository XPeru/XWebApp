(function () {
	
    function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('nav', {
				url: '/nav',
				controller: 'navBarController',
				templateUrl: 'dev/modules/NavBar/nav.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('home', {
				url: '/home',
				controller: 'homeController',
				templateUrl: 'dev/modules/Home/home.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('usuarios', {
				url: '/usuarios',
				controller: 'usuariosController',
				templateUrl: 'dev/modules/Usuarios/usuarios.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('articulos', {
				url: '/articulos',
				controller: 'articulosController',
				templateUrl: 'dev/modules/Articulos/articulos.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('almacenes', {
				url: '/almacenes',
				controller: 'almacenesController',
				templateUrl: 'dev/modules/Almacenes/almacenes.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('ingresos', {
				url: '/ingresos',
				controller: 'ingresosController',
				templateUrl: 'dev/modules/Ingresos/ingresos.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('footer', {
				url: '/footer',
				controller: 'footerController',
				templateUrl: 'dev/modules/Footer/footer.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('login', {
				url: '/login',
				controller: 'loginController',
				templateUrl: 'dev/modules/Login/login.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('topbar', {
				url: '/topbar',
				controller: 'topbarController',
				templateUrl: 'dev/modules/TopBar/topbar.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('usuariotipo', {
				url: '/usuariotipo',
				controller: 'usuariosTipoController',
				templateUrl: 'dev/modules/UsuariosTipo/usuariosTipo.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('usuarioacceso', {
				url: '/usuarioacceso',
				controller: 'usuariosAccesoController',
				templateUrl: 'dev/modules/UsuariosAcceso/usuariosAcceso.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			});

		$urlRouterProvider.otherwise('home');
	}
	/*
	
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        
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
        });
    }*/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    //run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    angular.module('xWebApp', [
	'ngTable',
	'ngCookies',
	'Footer',
	'Login',
	'TopBar',
	'NavBar',
	'LeftBar',
	'Home',
	'Usuarios',
	'UsuariosTipo',
	'UsuariosAcceso',
	'Articulos',
	'Almacenes',
	'Ingresos',
	'usuariosService',
	'usuariosTipoService',
	'usuariosAccesoService',
	'articulosService',
	'almacenesService',
	'ingresosService',
	'loginService',
	'ngRoute',
	'ui.router',
	'ui.bootstrap'])
	.config(config);
    //.run(run);
    


})();