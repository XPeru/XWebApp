"use strict";

angular.module('clienteService', ['ngResource'])
	.factory('ClienteServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/persona';

			service.getAllCliente = function() {
				return $http.get(urlBase + 'list' + '/Cliente');
			};

			service.createCliente = function(newCliente) {
				return $http.post(urlBase, newCliente);
			};

			service.updateCliente = function(updCliente) {
				return $http.put(urlBase, updCliente);
			};

			service.deleteCliente = function(id_cliente) {
				return $http.delete(urlBase + '/' + id_cliente);
			};

			return service;
		}
);
