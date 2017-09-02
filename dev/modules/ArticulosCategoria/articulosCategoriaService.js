"use strict";

angular.module('ArticulosCategoriaService', ['ngResource'])
	.factory('ArticulosCategoriaServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/categoria';

			service.getAllCategorias = function() {
				return $http.get(urlBase + '/list');
			};

			service.createCategoria = function(categoria) {
				return $http.post(urlBase, categoria);
			};

			service.editCategoria = function(categoria) {
				return $http.put(urlBase, categoria);
			};

			service.deleteCategoria = function(categoria) {
				return $http.delete(urlBase + '/' + categoria.ID_CATEGORIA);
			};

			return service;
		}
);
