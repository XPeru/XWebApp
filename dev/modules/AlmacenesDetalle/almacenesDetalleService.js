var almacenesService = angular.module('almacenesDetalleService', ['ngResource']);

almacenesService.factory('AlmacenesDetalleServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/almacendetalle';

	service.getAllAlmacenesDetalle = function(callback) {
		$http.get(urlBase + 'list')
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});