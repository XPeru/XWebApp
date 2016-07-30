"use strict";
angular.module('AlmacenesDetalle', ['ui.bootstrap'])
	.controller('almacenesDetalleController', ['$rootScope',
												'$scope',
												'$http',
												'$timeout',
												'AlmacenesDetalleServiceFactory',
												'NgTableParams', 
												'$stateParams',
		function ($rootScope, $scope, $http, $timeout, AlmacenesDetalleServiceFactory, NgTableParams, $stateParams) {
			var ctrl = this;
			ctrl.nombreAlmacen = {"nombre" : $stateParams.codigo_almacen};
		}
]);