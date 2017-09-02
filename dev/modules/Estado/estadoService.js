"use strict";

angular.module('estadoService', ['ngResource'])
	.factory('EstadoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/estado';

			service.getAllEstado = function() {
				return $http.get(urlBase + '/list');
			};

			service.createEstado = function (estado) {
				return $http.post(urlBase, estado);
			};

			service.updateEstado = function (estado) {
				return $http.put(urlBase, estado);
			};

			service.deleteEstado = function (id) {
				return $http.delete(urlBase + '/' + id);
			};

			return service;
		}
);
