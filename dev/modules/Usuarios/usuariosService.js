var usuariosService = angular.module('usuariosService', ['ngResource']);

usuariosService.factory('UsuariosServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/usuario';

	service.getUsuarioList = function(callback) {
		$http.get(urlBase + 'list')
			.success(function(response) {
				callback(response);
			});
	};

	service.getUsuarioByIdUsuario = function(callback, id_usuario) {
		$http.get(urlBase + '/' + id_usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.createUsuario = function(callback, usuario) {
		$http.post(urlBase, usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.updateUsuario = function(callback, usuario) {
		$http.put(urlBase, usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.deleteUsuario = function(callback, usuario) {
		$http.put(urlBase + 'delete', usuario)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
