var almacenes = angular.module('Almacenes', ['ui.bootstrap']);

almacenes.controller('almacenesController', ['$scope', '$location', '$http', '$timeout',
	'AlmacenesGestionServiceFactory',
	function($scope, $location, $http, $timeout, AlmacenesGestionServiceFactory) {


		$scope.callGetAllAlmacenes = function() {
			AlmacenesGestionServiceFactory.getAllAlmacenes(function(response) {
					$timeout(function() {
				//	$scope.almacenesDataLeft = response;
						// response array
						// pares pa un lado
						// impares al otro
						//$scope.almacenesDataRight = response;
						$scope.almacenesData = response;
					}, 200);
			});
		};

		$scope.callGetAllAlmacenes();

}]);