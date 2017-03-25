/*global $*/

    angular.module('xWebApp', [
    'ui.grid',
	'ngTable',
	'ngCookies',
	'ngAnimate',
	'ui.utils.masks',
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
	'Ingreso',
	'usuariosService',
	'usuariosTipoService',
	'usuariosAccesoService',
	'articulosService',
	'ArticulosCategoriaService',
	'almacenesGestionService',
	'almacenesDetalleService',
	'TipoPersona',
	'tipoPersonaService',
	'Cliente',
	'clienteService',
	'ingresoService',
	'Proveedor',
	'proveedorService',
	'TipoDocumento',
	'tipoDocumentoService',
	'Estado',
	'estadoService',
	'loginService',
	'ngRoute',
	'ui.router',
	'ui.bootstrap'
	])
	.config(['$stateProvider', '$urlRouterProvider', function config($stateProvider, $urlRouterProvider) {

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

			.state('app.tipopersona', {
				url: 'tipopersona',
				views : {
					'content@': {
						controller: 'tipoPersonaController',
						controllerAs: 'tipoPersonaCtrl',
						templateUrl: 'dev/modules/TipoPersona/tipopersona.html'
					}
				}
			})

			.state('app.cliente', {
				url: 'cliente',
				views : {
					'content@': {
						controller: 'clienteController',
						controllerAs: 'clienteCtrl',
						templateUrl: 'dev/modules/Cliente/cliente.html'
					}
				}
			})

			.state('app.proveedor', {
				url: 'proveedor',
				views : {
					'content@': {
						controller: 'proveedorController',
						controllerAs: 'proveedorCtrl',
						templateUrl: 'dev/modules/Proveedor/proveedor.html'
					}
				}
			})

			.state('app.tipodocumento', {
				url: 'tipodocumento',
				views : {
					'content@': {
						controller: 'tipoDocumentoController',
						controllerAs: 'tipoDocumentoCtrl',
						templateUrl: 'dev/modules/tipoDocumento/tipodocumento.html'
					}
				}
			})

			.state('app.estado', {
				url: 'estado',
				views : {
					'content@': {
						controller: 'estadoController',
						controllerAs: 'estadoCtrl',
						templateUrl: 'dev/modules/estado/estado.html'
					}
				}
			})

			.state('app.ingreso', {
				url: 'ingreso',
				views : {
					'content@': {
						controller: 'ingresoController',
						controllerAs: 'ingresoCtrl',
						templateUrl: 'dev/modules/ingreso/ingreso.html'
					}
				}
			})

			/*
			.state('footer', {
				url: '/footer',
				controller: 'footerController',
				templateUrl: 'dev/modules/Footer/footer.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})*/
			.state('app.login', {
				url: 'login',
				views : {
					'topbar@' : {
						
					},
					'content@': {
						controller: 'loginController',
						templateUrl: 'dev/modules/login/login.html'
					}
				}
			});

		$urlRouterProvider.otherwise('/');
	}])
    .run(['$rootScope', '$location', '$cookieStore', '$http', function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
 
        $rootScope.$on('$locationChangeStart', function () {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }]);