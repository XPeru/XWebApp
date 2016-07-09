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

	service.createUsuario = function(usuario) {
		return $http.post(urlBase, usuario);
	};

/*	service.updateUsuario = function(callback, usuario) {
		$http.put(urlBase, usuario)
			.success(function(response) {
				callback(response);
			});
	};*/

	service.updateUsuario = function(usuario) {
		return $http.put(urlBase, usuario);
	};

	service.deleteUsuario = function(callback, usuario) {
		$http.put(urlBase + 'delete', usuario)
			.success(function(response) {
				callback(response);
			});
	};

	service.uploadPhotoUsuario = function(file) {
		var fd = new FormData();
		fd.append('userPhoto', file);
		return $http.post(urlBase + 'photo', fd, {
											transformRequest: angular.identity,
											headers: {'Content-Type': undefined}
											});
	};

	return service;
});
