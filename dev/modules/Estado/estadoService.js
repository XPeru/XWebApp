"use strict";

angular.module('estadoService', ['ngResource'])
	.factory('EstadoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/estado';

			service.getAllEstado = function() {
				return $http.get(urlBase + 'list');
			};

			service.createEstado = function(newEstado) {
				return $http.post(urlBase, newEstado);
			};

			service.updateEstado = function(updEstado) {
				return $http.put(urlBase, updEstado);
			};

			service.deleteEstado = function(id_estado) {
				return $http.delete(urlBase + '/' + id_estado);
			};

			return service;
		}
);