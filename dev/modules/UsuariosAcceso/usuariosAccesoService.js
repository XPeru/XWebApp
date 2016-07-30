"use strict";
var usuariosAccesoService = angular.module('usuariosAccesoService', ['ngResource']);

usuariosAccesoService.factory('UsuariosAccesoServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api';

	service.getAllAccesoUsuario = function() {
		return $http.get(urlBase + '/accesousuariolist');
	};

	service.getAccesoUsuarioById = function(id_acceso_usuario) {
		return $http.get(urlBase + '/accesousuario' + id_acceso_usuario);
	};

	service.createAccesoUsuario = function(new_acceso_usuario) {
		return $http.post(urlBase + '/accesousuario', new_acceso_usuario);
	};

	service.updateAccesoUsuario = function(updated_acceso_usuario) {
		return $http.put(urlBase + '/accesousuario', updated_acceso_usuario);
	};

	service.deleteAccesoUsuario = function(id_acceso_usuario) {
		return $http.delete(urlBase + '/accesousuario'+ '/' + id_acceso_usuario);
	};

	return service;
});
