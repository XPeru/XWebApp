"use strict";
angular.module('Almacenes', ['ui.bootstrap'])
	.controller('almacenesController', ['$scope',
										'$location',
										'$http',
										'$timeout',
										'AlmacenesGestionServiceFactory',
	function($scope, $location, $http, $timeout, AlmacenesGestionServiceFactory) {
		var ctrl = this;
		ctrl.callGetAllAlmacenes = function() {
			AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {		
				ctrl.almacenesData = response.data;
			});
		};

		ctrl.callGetAllAlmacenes();

	}]);