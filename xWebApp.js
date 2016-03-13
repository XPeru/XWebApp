
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
	'ui.bootstrap'
])

	.controller('TodoListController', function() {
		var todoList = this;
		todoList.todos = [
			{text:'learn angular', done:true},
			{text:'build an angular app', done:false}
		];

	})

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		
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
	
	}]);