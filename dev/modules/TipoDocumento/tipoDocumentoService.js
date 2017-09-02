"use strict";

angular.module('tipoDocumentoService', ['ngResource'])
	.factory('TipoDocumentoServiceFactory',
		function ($http) {
			var service = {};
			var urlBase = '/api/tipodocumento';

			service.getAllTipoDocumento = function () {
				return $http.get(urlBase + '/list');
			};

			service.createTipoDocumento = function (documento) {
				return $http.post(urlBase, documento);
			};

			service.updateTipoDocumento = function (documento) {
				return $http.put(urlBase, documento);
			};

			service.deleteTipoDocumento = function (id) {
				return $http.delete(urlBase + '/' + id);
			};

			return service;
		}
);
