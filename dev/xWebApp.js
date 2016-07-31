(function () {
	
    function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('app', {
				url: '/',
				views: {
					'topbar' : {
						controller: 'topbarController',
						controllerAs: 'topbarCtrl',
						/*controller: 'navBarController',*/
						templateUrl: 'dev/modules/TopBar/topbar.html',
						/*templateUrl: 'dev/modules/NavBar/nav.html',*/
						reloadOnSearch: false
					},
					'content' : {
						controller: 'homeController',
						templateUrl: 'dev/modules/Home/home.html'
					}
				}
			})

			.state('app.almacenes', {
				url: 'almacenes',
				views : {
					'content@': {
						controller: 'almacenesController',
						controllerAs: 'almacenesCtrl',
						templateUrl: 'dev/modules/Almacenes/almacenes.html'
					}
				}
			})

			.state('app.almacenesgestion', {
				url: 'almacenesgestion',
				views : {
					'content@': {
						controller: 'almacenesGestionController',
						controllerAs: 'almacenesGestionCtrl',
						templateUrl: 'dev/modules/AlmacenesGestion/almacenesGestion.html'
					}
				}
				
			})

			.state('app.almacenesdetalle', {
				url: 'almacenesdetalle/:id_almacen/:codigo_almacen',
				views : {
					'content@': {
						controller: 'almacenesDetalleController',
						controllerAs: 'almacenesDetalleCtrl',
						templateUrl: 'dev/modules/AlmacenesDetalle/almacenesDetalle.html'
					}
				}
			})

			.state('app.usuarios', {
				url: 'usuarios',
				views : {
					'content@': {
						controller: 'usuariosController',
						controllerAs: 'usuariosCtrl',
						templateUrl: 'dev/modules/Usuarios/usuarios.html'
					}
				}
			})

			.state('app.usuariostipo', {
				url: 'usuariostipo',
				views : {
					'content@': {
						controller: 'usuariosTipoController',
						controllerAs: 'usuariosTipoCtrl',
						templateUrl: 'dev/modules/UsuariosTipo/usuariosTipo.html'
					}
				}
				
			})

			.state('app.usuariosacceso', {
				url: 'usuariosacceso',
				views : {
					'content@': {
						controller: 'usuariosAccesoController',
						controllerAs: 'usuariosAccesoCtrl',
						templateUrl: 'dev/modules/UsuariosAcceso/usuariosAcceso.html'
					}
				}
			})

			.state('app.articuloscategoria', {
				url: 'articuloscategoria',
				views : {
					'content@': {
						controller: 'articulosCategoriaController',
						controllerAs: 'articulosCategoriaCtrl',
						templateUrl: 'dev/modules/ArticulosCategoria/articulosCategoria.html'
					}
				}
			})

			.state('app.articulos', {
				url: 'articulos',
				views : {
					'content@': {
						controller: 'articulosController',
						controllerAs: 'articulosCtrl',
						templateUrl: 'dev/modules/Articulos/articulos.html'
					}
				}
			})

			;



			/*
			
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
			
			;*/

		$urlRouterProvider.otherwise('/');
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
	'ArticulosCategoria',
	'Almacenes',
	'AlmacenesGestion',
	'AlmacenesDetalle',
	'Ingresos',
	'usuariosService',
	'usuariosTipoService',
	'usuariosAccesoService',
	'articulosService',
	'ArticulosCategoriaService',
	'almacenesGestionService',
	'almacenesDetalleService',
	'ingresosService',
	//'loginService',
	'ngRoute',
	'ui.router',
	'ui.bootstrap'])
	.config(config);
    //.run(run);
    


})();