"use strict";

angular.module('ingresoService', ['ngResource'])
	.factory('IngresoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/ingreso';
			var urlBaseDetalle = urlBase + "detalle";

			service.getAllIngreso = function () {
				return $http.get(urlBase + '/list');
			};

			service.getIngresoById = function (id) {
				return $http.get(urlBase + id);
			};

			service.createIngreso = function (ingreso) {
				ingreso.FECHA_INGRESO = ingreso.FECHA_INGRESO.toLocaleDateString('en-us', {year:"numeric", month:"2-digit", day:"2-digit"});
				return $http.post(urlBase, ingreso);
			};

			service.updateIngreso = function (ingreso) {
				ingreso.FECHA_INGRESO = ingreso.FECHA_INGRESO.toLocaleDateString('en-us', {year:"numeric", month:"2-digit", day:"2-digit"});
				return $http.put(urlBase, ingreso);
			};

			service.deleteIngreso = function (id) {
				return $http.delete(urlBase + '/' + id);
			};

			service.updateCostoIngreso = function (ingreso) {
				return $http.put(urlBaseDetalle, ingreso);
			};

			service.getDetalleIngreso = function (id) {
				return $http.get(urlBaseDetalle + '/list/' + id);
			};

			service.updateIngresoDetalle = function (ingreso) {
				return $http.post(urlBaseDetalle, ingreso);
			};

			service.deleteIngresoDetalle = function (id) {
				return $http.delete(urlBaseDetalle + '/' + id);
			};

			return service;
		}
);
