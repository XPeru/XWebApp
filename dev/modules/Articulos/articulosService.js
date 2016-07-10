var articulosService = angular.module('articulosService', ['ngResource']);

articulosService.factory('ArticulosServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/articulo';

	service.getArticuloList = function(callback) {
		$http.get(urlBase + 'list')
			.success(function(response) {
				callback(response);
			});
	};

	service.getArticuloByIdArticulo = function(callback, id_articulo) {
		$http.get(urlBase + '/' + id_articulo)
			.success(function(response) {
				callback(response);
			});
	};

	service.createArticulo = function(articulo) {
		return $http.post(urlBase, articulo);
	};

	service.updateArticulo = function(articulo) {
		return $http.put(urlBase, articulo);
	};

	service.deleteArticulo = function(callback, articulo) {
		$http.delete(urlBase + 'delete', articulo)
			.success(function(response) {
				callback(response);
			});
	};

	service.uploadImageArticulo = function(file) {
		var fd = new FormData();
		fd.append('articleImage', file);
		return $http.post(urlBase + 'image', fd, {
											transformRequest: angular.identity,
											headers: {'Content-Type': undefined}
											});
	};

	return service;
});