var ingresosService = angular.module('ingresosService', ['ngResource']);

ingresosService.factory('IngresosServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api';


	service.createIngreso = function(callback, ingreso_new) {
		$http.post(urlBase + '/ingresoArt', ingreso_new)
			.success(function(response) {
				callback(response);
			});
		$http.post(urlBase + '/ingresoArtDet', ingreso_new)
			.success(function(response) {
				callback(response);
			});
		$http.put(urlBase + '/almacenDet', ingreso_new)
			.success(function(response) {
				callback(response);
			});
	};

	service.getAllIngresos = function(callback) {
		$http.get(urlBase + '/ingresos').success(function(response) {
			callback(response);
		});
	};




	return service;
});
