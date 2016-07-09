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

	service.createArticulo = function(callback, articulo) {
		$http.post(urlBase, articulo)
			.success(function(response) {
				callback(response);
			});
	};

	service.updateArticulo = function(callback, articulo) {
		$http.put(urlBase, articulo)
			.success(function(response) {
				callback(response);
			});
	};

	service.deleteArticulo = function(callback, articulo) {
		$http.delete(urlBase + 'delete', articulo)
			.success(function(response) {
				callback(response);
			});
	};

	service.uploadImageArticulo = function(callback, file) {
		$http.post(urlBase + '/image', file)
			.success(function(response) {
				callback(response);
			});
	};


	return service;
});