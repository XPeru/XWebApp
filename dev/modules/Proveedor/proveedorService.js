"use strict";

angular.module('proveedorService', ['ngResource'])
	.factory('ProveedorServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/persona';

			service.getAllProveedor = function() {
				return $http.get(urlBase + '/list' + '/Proveedor');
			};

			service.createProveedor = function (proveedor) {
				return $http.post(urlBase, proveedor);
			};

			service.updateProveedor = function (proveedor) {
				return $http.put(urlBase, proveedor);
			};

			service.deleteProveedor = function (id) {
				return $http.delete(urlBase + '/' + id);
			};

			return service;
		}
);
