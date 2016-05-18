var usuariosTipoService = angular.module('usuariosTipoService', ['ngResource']);

usuariosTipoService.factory('UsuariosTipoServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api';

	service.getAllTipoUsuario = function(callback) {
		$http.get(urlBase + '/tipousuariolist')
			.success(function(response) {
				callback(response);
			});
	};

	service.getTipoUsuarioById = function(callback, id_tipo_usuario) {
		$http.get(urlBase + '/tipousuario' + id_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.createTipoUsuario = function(callback, new_tipo_usuario) {
		$http.post(urlBase + '/tipousuario', new_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.updateTipoUsuario = function(callback, updated_tipo_usuario) {
		$http.put(urlBase + '/tipousuario', updated_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.deleteTipoUsuario = function(callback, id_tipo_usuario) {
		$http.delete(urlBase + '/tipousuario'+ '/' + id_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
