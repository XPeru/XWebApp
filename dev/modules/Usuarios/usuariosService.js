var usuariosService = angular.module('usuariosService', ['ngResource']);

usuariosService.factory('UsuariosServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/usuario';

	service.getUsuarioList = function() {
		return $http.get(urlBase + 'list');
	};

	service.getUsuarioByIdUsuario = function(id_usuario) {
		return $http.get(urlBase + '/' + id_usuario);
	};

	service.createUsuario = function(usuario) {
		return $http.post(urlBase, usuario);
	};

	service.updateUsuario = function(usuario) {
		return $http.put(urlBase, usuario);
	};

	service.deleteUsuario = function(usuario) {
		return $http.put(urlBase + 'delete', usuario);
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
