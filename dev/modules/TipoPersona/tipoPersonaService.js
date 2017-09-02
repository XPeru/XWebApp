"use strict";

angular.module('tipoPersonaService', ['ngResource'])
	.factory('TipoPersonaServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/tipopersona';

			service.getAllTipoPersona = function () {
				return $http.get(urlBase + '/list');
			};

			service.getTipoPersonaByDesc = function (desc) {
				return $http.get(urlBase + '/' + desc);
			};

			service.createTipoPersona = function (persona) {
				return $http.post(urlBase, persona);
			};

			service.updateTipoPersona = function (persona) {
				return $http.put(urlBase, persona);
			};

			service.deleteTipoPersona = function (id) {
				return $http.delete(urlBase + '/' + id);
			};

			return service;
		}
);
