"use strict";

angular.module('tipoPersonaService', ['ngResource'])
	.factory('TipoPersonaServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/tipopersona';

			service.getAllTipoPersona = function() {
				return $http.get(urlBase + 'list');
			};

			service.getTipoPersonaByDesc = function(desc) {
				return $http.get(urlBase + '/' + desc);
			};

			service.createTipoPersona = function(newTipoPersona) {
				return $http.post(urlBase, newTipoPersona);
			};

			service.updateTipoPersona = function(updTipoPersona) {
				return $http.put(urlBase, updTipoPersona);
			};

			service.deleteTipoPersona = function(id_tipopersona) {
				return $http.delete(urlBase + '/' + id_tipopersona);
			};

			return service;
		}
);