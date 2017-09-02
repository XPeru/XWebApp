"use strict";

angular.module('almacenesGestionService', ['ngResource'])
	.factory('AlmacenesGestionServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/almacen';

			service.getAllAlmacenes = function() {
				return $http.get(urlBase + '/list');
			};

			service.createAlmacen = function (almacen) {
				return $http.post(urlBase, almacen);
			};

			service.editAlmacen = function (almacen) {
				return $http.put(urlBase, almacen);
			};

			service.deleteAlmacen = function (almacen) {
				return $http.delete(urlBase + '/' + almacen.ID_ALMACEN);
			};

			return service;
		}
);
