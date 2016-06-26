var almacenesDetalle = angular.module('AlmacenesDetalle', ['ui.bootstrap']);

almacenesDetalle.controller('almacenesDetalleController', ['$rootScope', '$scope', '$http', '$timeout',
							'AlmacenesDetalleServiceFactory', 'NgTableParams', '$stateParams',
function ($rootScope, $scope, $http, $timeout, AlmacenesDetalleServiceFactory, NgTableParams, $stateParams) {
	$scope.nombreAlmacen = {"nombre" : $stateParams.codigo_almacen};


}]);