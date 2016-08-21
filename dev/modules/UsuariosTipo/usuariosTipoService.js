"use strict";
var usuariosTipoService = angular.module('usuariosTipoService', ['ngResource']);

usuariosTipoService.factory('UsuariosTipoServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/';
	var urlBaseTipo = urlBase + 'tipousuario';

	service.getAllTipoUsuario = function() {
		return $http.get(urlBaseTipo + 'list');
	};

	service.getTipoUsuarioById = function(id_tipo_usuario) {
		return $http.get(urlBaseTipo +'/' + id_tipo_usuario);
	};

	service.createTipoUsuario = function(new_tipo_usuario) {
		return $http.post(urlBaseTipo, new_tipo_usuario);
	};

	service.updateTipoUsuario = function(updated_tipo_usuario) {
		return $http.put(urlBaseTipo, updated_tipo_usuario);
	};

	service.deleteTipoUsuario = function(id_tipo_usuario) {
		return $http.delete(urlBaseTipo + '/' + id_tipo_usuario);
	};

	service.getAssosTipoAccesosByIdTipoUsuario = function(id_tipo_usuario) {
		return $http.get(urlBase + 'asoctipoacceso/' + id_tipo_usuario);
	};

	service.getPDF = function(callback) {
		$http.get(urlBaseTipo + 'topdf')
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
