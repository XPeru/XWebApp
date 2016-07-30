"use strict";

angular.module('almacenesDetalleService', ['ngResource'])
	.factory('AlmacenesDetalleServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/almacendetalle';

			service.getAllAlmacenesDetalle = function() {
				return $http.get(urlBase + 'list');
			};

			return service;
		}
	);