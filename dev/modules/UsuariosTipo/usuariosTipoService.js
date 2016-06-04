var usuariosTipoService = angular.module('usuariosTipoService', ['ngResource']);

usuariosTipoService.factory('UsuariosTipoServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/tipousuario';

	service.getAllTipoUsuario = function(callback) {
		$http.get(urlBase + 'list')
			.success(function(response) {
				callback(response);
			});
	};

	service.getTipoUsuarioById = function(callback, id_tipo_usuario) {
		$http.get(urlBase +'/' + id_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.createTipoUsuario = function(callback, new_tipo_usuario) {
		$http.post(urlBase, new_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.updateTipoUsuario = function(callback, updated_tipo_usuario) {
		$http.put(urlBase, updated_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.deleteTipoUsuario = function(callback, id_tipo_usuario) {
		$http.delete(urlBase + '/' + id_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.getAssosTipoAccesosByIdTipoUsuario = function(callback, id_tipo_usuario) {
		$http.get(urlBase + '/assoaccesos' + '/' + id_tipo_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.getPDF = function(callback) {
		$http.get(urlBase + 'topdf')
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
