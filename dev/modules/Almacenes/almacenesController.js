"use strict";
var almacenes = angular.module('Almacenes', ['ui.bootstrap']);

almacenes.controller('almacenesController', ['$scope', '$location', '$http', '$timeout',
	'AlmacenesGestionServiceFactory',
	function($scope, $location, $http, $timeout, AlmacenesGestionServiceFactory) {

		$scope.callGetAllAlmacenes = function() {
			AlmacenesGestionServiceFactory.getAllAlmacenes().then( function(response) {		
				$scope.almacenesData = response.data;
			});
		};

		$scope.callGetAllAlmacenes();

}]);