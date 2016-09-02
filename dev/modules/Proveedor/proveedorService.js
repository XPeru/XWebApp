"use strict";

angular.module('proveedorService', ['ngResource'])
	.factory('ProveedorServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/persona';

			service.getAllProveedor = function() {
				return $http.get(urlBase + 'list' + '/Proveedor');
			};

			service.createProveedor = function(newProveedor) {
				return $http.post(urlBase, newProveedor);
			};

			service.updateProveedor = function(updProveedor) {
				return $http.put(urlBase, updProveedor);
			};

			service.deleteProveedor = function(id_proveedor) {
				return $http.delete(urlBase + '/' + id_proveedor);
			};

			return service;
		}
);