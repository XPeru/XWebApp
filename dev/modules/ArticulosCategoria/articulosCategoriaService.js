var categoriaesService = angular.module('ArticulosCategoriaService', ['ngResource']);

categoriaesService.factory('ArticulosCategoriaServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/categoria';

	service.getAllCategorias = function() {
		return $http.get(urlBase + 'list');
	};

	service.createCategoria = function(categoria_created) {
		return $http.post(urlBase, categoria_created);
	};

	service.editCategoria = function(categoria_edited) {
		return $http.put(urlBase, categoria_edited);
	};
	service.deleteCategoria = function(categoria_deleted) {
		return $http.delete(urlBase + '/' + categoria_deleted.ID_CATEGORIA);
	};

	return service;
});