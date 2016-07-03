var categoriaesService = angular.module('ArticulosCategoriaService', ['ngResource']);

categoriaesService.factory('ArticulosCategoriaServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/categoria';

	service.getAllCategorias = function(callback) {
		$http.get(urlBase + 'list')
			.success(function(response) {
				callback(response);
			});
	};

	service.createCategoria = function(callback, categoria_created) {
		$http.post(urlBase, categoria_created)
			.success(function(response) {
				callback(response);
			});
	};

	service.editCategoria = function(callback, categoria_edited) {
		$http.put(urlBase, categoria_edited)
			.success(function(response) {
				callback(response);
			});
	};
	service.deleteCategoria = function(callback, categoria_deleted) {
		$http.delete(urlBase + '/' + categoria_deleted.ID_CATEGORIA)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});