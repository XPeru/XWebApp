"use strict";

angular.module('ingresoService', ['ngResource'])
	.factory('IngresoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/ingreso';
			var urlBaseDetalle = urlBase + "detalle";

			service.getAllIngreso = function() {
				return $http.get(urlBase + 'list');
			};

			service.getIngresoById = function(id_ingreso) {
				return $http.get(urlBase + id_ingreso);
			};

			service.createIngreso = function(newIngreso) {
				newIngreso.FECHA_INGRESO = newIngreso.FECHA_INGRESO.toLocaleDateString('en-us', {year:"numeric", month:"2-digit", day:"2-digit"});
				return $http.post(urlBase, newIngreso);
			};

			service.updateIngreso = function(updIngreso) {
				updIngreso.FECHA_INGRESO = updIngreso.FECHA_INGRESO.toLocaleDateString('en-us', {year:"numeric", month:"2-digit", day:"2-digit"});
				return $http.put(urlBase, updIngreso);
			};

			service.deleteIngreso = function(id_ingreso) {
				return $http.delete(urlBase + '/' + id_ingreso);
			};

			service.getDetalleIngreso = function(id_ingreso) {
				return $http.get(urlBaseDetalle + 'list' + '/' + id_ingreso);
			};

			return service;
		}
);