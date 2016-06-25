var almacenesService = angular.module('almacenesGestionService', ['ngResource']);

almacenesService.factory('AlmacenesGestionServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/almacen';

	service.getAllAlmacenes = function(callback) {
		$http.get(urlBase + 'list')
			.success(function(response) {
				callback(response);
			});
	};

	service.createAlmacen = function(callback, almacen_created) {
		$http.post(urlBase, almacen_created)
			.success(function(response) {
				callback(response);
			});
	};

	service.editAlmacen = function(callback, almacen_edited) {
		$http.put(urlBase, almacen_edited)
			.success(function(response) {
				callback(response);
			});
	};
	service.deleteAlmacen = function(callback, almacen_deleted) {
		$http.delete(urlBase + '/' + almacen_deleted.ID_ALMACEN)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});