"use strict";
angular.module('Home', [])

	.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		var ctrl = this;

		$rootScope.comment2 ="this is usless";
		ctrl.keys = ["usuario", "almacen", "articulo", "cliprov", "movimiento"];
		ctrl.show = {
			usuario: false,
			almacen: false,
			articulo: false,
			cliprov: false,
			movimiento: false
		}


		ctrl.showHideMenu = function(menu) {
			angular.forEach(ctrl.keys, function(value) {
				ctrl.show[value] = value === menu ? !ctrl.show[value] : false;
			});
		};

		ctrl.menu = [];

		ctrl.menu.dashboard = {
			alt: "Dashboard",
			title: "Dashboard",
			subtitle: "Muestra las graficas de compras, ventas, entradas y salidas por periodos.",
			stringMenu: '',
			color: 'pie-image-menu-skyblue',
			src: './dev/media/dashboard_test.jpeg',
			background: 'back-skyblue',
			classIcon: "fa fa-area-chart center-icon"
		};

		ctrl.menu.usuario = {
			alt: "Usuarios",
			title: "Usuarios",
			subtitle: "Funcionalidades asociadas a los usuarios, creacion, edicion y permisos asociados.",
			stringMenu: 'usuario',
			color: 'pie-image-menu-red',
			src: './dev/media/usuarios.jpg',
			background: 'back-red',
			classIcon: "glyphicon glyphicon-user center-icon"
		};

		ctrl.menu.almacen = {
			alt: "Almacenes",
			title: "Almacenes",
			subtitle: "Creacion, edicion de almacenes.",
			stringMenu: 'almacen',
			color: 'pie-image-menu-green',
			src: './dev/media/almacenes.jpg',
			background: 'back-green',
			classIcon: "fa fa-cubes center-icon"
		};

		ctrl.menu.articulo = {
			alt: "Articulos",
			title: "Articulos",
			subtitle: "Creacion y edicion de articulos en la aplicacion.",
			stringMenu: 'articulo',
			color: 'pie-image-menu-blue',
			src: './dev/media/articulos.jpg',
			background: 'back-blue',
			classIcon: "glyphicon glyphicon-th-list center-icon"
		};

		ctrl.menu.cliprov = {
			alt: "Clientes y Proveedores",
			title: "Clientes y Proveedores",
			subtitle: "Creacion, edicion y supresion de clientes y proveedores.",
			stringMenu: 'cliprov',
			color: 'pie-image-menu-purple',
			src: './dev/media/personas.jpg',
			background: 'back-purple',
			classIcon: "center-icon glyphicon glyphicon-globe"
		};

		ctrl.menu.movimiento = {
			alt: "Movimientos",
			title: "Movimientos",
			subtitle: "Ingresos y salidas",
			stringMenu: 'movimiento',
			color: 'pie-image-menu-orange',
			src: './dev/media/movimientos.jpg',
			background: 'back-orange',
			classIcon: "glyphicon glyphicon-transfer center-icon"
		};

	}]);
