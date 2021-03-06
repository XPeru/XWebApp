"use strict";

angular.module('articulosService', ['ngResource'])
	.factory('ArticulosServiceFactory',
		function($http) {
			var service = {};
			var urlBase = '/api/articulo';

			service.getArticuloList = function() {
				return $http.get(urlBase + '/list');
			};

			service.getArticuloByIdArticulo = function (id) {
				return $http.get(urlBase + '/' + id);
			};

			service.createArticulo = function (articulo) {
				return $http.post(urlBase, articulo);
			};

			service.updateArticulo = function (articulo) {
				return $http.put(urlBase, articulo);
			};

			service.uploadImageArticulo = function (file) {
				var fd = new FormData();
				fd.append('articleImage', file);
				return $http.post(urlBase + '/image', fd, {
													transformRequest: angular.identity,
													headers: {'Content-Type': undefined}
													});
			};

			return service;
		}
);
