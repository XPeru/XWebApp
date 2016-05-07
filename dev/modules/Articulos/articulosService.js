var articulosService = angular.module('articulosService', ['ngResource']);

articulosService.factory('ArticulosServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api';

	service.getAllArticulos = function(callback) {
		$http.get(urlBase + '/articulosList')
			.success(function(response) {
				callback(response);
			});
	};

	service.createArticulo = function(callback, articulo_created) {
		$http.post(urlBase + '/articulo', articulo_created)
			.success(function(response) {
				callback(response);
			});
	};

	service.editArticulo = function(callback, articulo_edited) {
		$http.put(urlBase + '/articulo', articulo_edited)
			.success(function(response) {
				callback(response);
			});
	};
	service.deleteArticulo = function(callback, articulo_deleted) {
		$http.delete(urlBase + '/deleteArticulo'+ '/' + articulo_deleted.ART_SEQ)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});