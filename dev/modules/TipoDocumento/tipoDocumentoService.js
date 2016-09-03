"use strict";

angular.module('tipoDocumentoService', ['ngResource'])
	.factory('TipoDocumentoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/tipodocumento';

			service.getAllTipoDocumento = function() {
				return $http.get(urlBase + 'list');
			};

			service.createTipoDocumento = function(newTipoDocumento) {
				return $http.post(urlBase, newTipoDocumento);
			};

			service.updateTipoDocumento = function(updTipoDocumento) {
				return $http.put(urlBase, updTipoDocumento);
			};

			service.deleteTipoDocumento = function(id_tipodocumento) {
				return $http.delete(urlBase + '/' + id_tipodocumento);
			};

			return service;
		}
);