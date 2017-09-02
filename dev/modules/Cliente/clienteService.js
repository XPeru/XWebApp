"use strict";

angular.module('clienteService', ['ngResource'])
	.factory('ClienteServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/persona';

			service.getAllCliente = function () {
				return $http.get(urlBase + '/list' + '/Cliente');
			};

			service.createCliente = function (cliente) {
				return $http.post(urlBase, cliente);
			};

			service.updateCliente = function (cliente) {
				return $http.put(urlBase, cliente);
			};

			service.deleteCliente = function(id) {
				return $http.delete(urlBase + '/' + id);
			};

			return service;
		}
);
