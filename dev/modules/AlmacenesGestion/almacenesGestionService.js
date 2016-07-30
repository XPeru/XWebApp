"use strict";

angular.module('almacenesGestionService', ['ngResource'])
	.factory('AlmacenesGestionServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/almacen';

			service.getAllAlmacenes = function() {
				return $http.get(urlBase + 'list');
			};

			service.createAlmacen = function(almacen_created) {
				return $http.post(urlBase, almacen_created);
			};

			service.editAlmacen = function(almacen_edited) {
				return $http.put(urlBase, almacen_edited);
			};

			service.deleteAlmacen = function(almacen_deleted) {
				return $http.delete(urlBase + '/' + almacen_deleted.ID_ALMACEN);
			};

			return service;
		}
);