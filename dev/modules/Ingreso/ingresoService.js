"use strict";

angular.module('ingresoService', ['ngResource'])
	.factory('IngresoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/ingreso';

			service.getAllIngreso = function() {
				return $http.get(urlBase + 'list');
			};

			service.getIngresoById = function(id_ingreso) {
				return $http.get(urlBase + id_ingreso);
			};

			service.createIngreso = function(newIngreso) {
				return $http.post(urlBase, newIngreso);
			};

			service.updateIngreso = function(updIngreso) {
				return $http.put(urlBase, updIngreso);
			};

			service.deleteIngreso = function(id_ingreso) {
				return $http.delete(urlBase + '/' + id_ingreso);
			};

			return service;
		}
);