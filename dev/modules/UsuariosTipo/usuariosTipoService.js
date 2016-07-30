"use strict";
var usuariosTipoService = angular.module('usuariosTipoService', ['ngResource']);

usuariosTipoService.factory('UsuariosTipoServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/tipousuario';

	service.getAllTipoUsuario = function() {
		return $http.get(urlBase + 'list');
	};

	service.getTipoUsuarioById = function(id_tipo_usuario) {
		return $http.get(urlBase +'/' + id_tipo_usuario);
	};

	service.createTipoUsuario = function(new_tipo_usuario) {
		return $http.post(urlBase, new_tipo_usuario);
	};

	service.updateTipoUsuario = function(updated_tipo_usuario) {
		return $http.put(urlBase, updated_tipo_usuario);
	};

	service.deleteTipoUsuario = function(id_tipo_usuario) {
		return $http.delete(urlBase + '/' + id_tipo_usuario);
	};

	service.getAssosTipoAccesosByIdTipoUsuario = function(callback, id_tipo_usuario) {
		return $http.get(urlBase + '/assoaccesos' + '/' + id_tipo_usuario);
	};

	service.getPDF = function(callback) {
		$http.get(urlBase + 'topdf')
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
