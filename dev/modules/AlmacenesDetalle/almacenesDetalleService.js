"use strict";
var almacenesService = angular.module('almacenesDetalleService', ['ngResource']);

almacenesService.factory('AlmacenesDetalleServiceFactory', function($http) {
	var service = {};
	var urlBase = '/api/almacendetalle';

	service.getAllAlmacenesDetalle = function() {
		return $http.get(urlBase + 'list');
	};

	return service;
});