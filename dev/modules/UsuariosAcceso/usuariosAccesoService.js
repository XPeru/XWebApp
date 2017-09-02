"use strict";

angular.module('usuariosAccesoService', ['ngResource'])
	.factory('UsuariosAccesoServiceFactory',
		function ($http) {
			var service = {};
			var urlBase = '/api/accesousuario';

			service.getAllAccesoUsuario = function () {
				return $http.get(urlBase + '/list');
			};

			service.getAccesoUsuarioById = function (id) {
				return $http.get(urlBase + id);
			};

			service.createAccesoUsuario = function (acceso) {
				return $http.post(urlBase, acceso);
			};

			service.updateAccesoUsuario = function (acceso) {
				return $http.put(urlBase, acceso);
			};

			service.deleteAccesoUsuario = function (id) {
				return $http.delete(urlBase + '/' + id);
			};

			return service;
		}
);
