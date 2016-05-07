var almacenesService = angular.module('almacenesService', ['ngResource']);

almacenesService.factory('AlmacenesServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api';

	service.getAllAlmacenes = function(callback) {
		$http.get(urlBase + '/almacenesList')
			.success(function(response) {
				callback(response);
			});
	};

	service.createAlmacen = function(callback, almacen_created) {
		$http.post(urlBase + '/almacen', almacen_created)
			.success(function(response) {
				callback(response);
			});
	};

	service.editAlmacen = function(callback, almacen_edited) {
		$http.put(urlBase + '/almacen', almacen_edited)
			.success(function(response) {
				callback(response);
			});
	};
	service.deleteAlmacen = function(callback, almacen_deleted) {
		$http.delete(urlBase + '/deleteAlmacen'+ '/' + almacen_deleted.ALM_SEQ)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});