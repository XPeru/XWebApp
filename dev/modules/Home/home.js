"use strict";
angular.module('Home', [])

	.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		var ctrl = this;
		ctrl.comment ="this is usless";
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
	}]);
