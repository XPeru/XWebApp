"use strict";

angular.module('usuariosAccesoService', ['ngResource'])
	.factory('UsuariosAccesoServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/accesousuario';

			service.getAllAccesoUsuario = function() {
				return $http.get(urlBase + 'list');
			};

			service.getAccesoUsuarioById = function(id_accesousuario) {
				return $http.get(urlBase + id_accesousuario);
			};

			service.createAccesoUsuario = function(newAccesoUsuario) {
				return $http.post(urlBase, newAccesoUsuario);
			};

			service.updateAccesoUsuario = function(updAccesoUsuario) {
				return $http.put(urlBase, updAccesoUsuario);
			};

			service.deleteAccesoUsuario = function(id_accesousuario) {
				return $http.delete(urlBase + '/' + id_accesousuario);
			};

			return service;
		}
);
