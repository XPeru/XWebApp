"use strict";
var usuariosAccesoService = angular.module('usuariosAccesoService', ['ngResource']);

usuariosAccesoService.factory('UsuariosAccesoServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api';

	service.getAllAccesoUsuario = function(callback) {
		$http.get(urlBase + '/accesousuariolist')
			.success(function(response) {
				callback(response);
			});
	};

	service.getAccesoUsuarioById = function(callback, id_acceso_usuario) {
		$http.get(urlBase + '/accesousuario' + id_acceso_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.createAccesoUsuario = function(callback, new_acceso_usuario) {
		$http.post(urlBase + '/accesousuario', new_acceso_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.updateAccesoUsuario = function(callback, updated_acceso_usuario) {
		$http.put(urlBase + '/accesousuario', updated_acceso_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.deleteAccesoUsuario = function(callback, id_acceso_usuario) {
		$http.delete(urlBase + '/accesousuario'+ '/' + id_acceso_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
