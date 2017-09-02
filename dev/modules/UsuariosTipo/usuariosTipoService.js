"use strict";
var usuariosTipoService = angular.module('usuariosTipoService', ['ngResource']);

usuariosTipoService.factory('UsuariosTipoServiceFactory', function ($http) {
	var service = {};
	var urlTipo = '/api/tipousuario';
	var urlAsso = '/api/asoctipoacceso';

	service.getAllTipoUsuario = function () {
		return $http.get(urlTipo + '/list');
	};

	service.getTipoUsuarioById = function (id) {
		return $http.get(urlTipo +'/' + id);
	};

	service.createTipoUsuario = function (tipo) {
		return $http.post(urlTipo, tipo);
	};

	service.updateTipoUsuario = function (tipo) {
		return $http.put(urlTipo, tipo);
	};

	service.deleteTipoUsuario = function (id) {
		return $http.delete(urlTipo + '/' + id);
	};

	service.getAssosTipoAccesosByIdTipoUsuario = function (id) {
		return $http.get(urlAsso + '/' + id);
	};

	service.updateAssosTipoAcceso = function (asso) {
		return $http.post(urlAsso, asso);
	};

	service.deleteAssosTipoAcceso = function (id) {
		return $http.delete(urlAsso + '/' + id);
	};

	service.getPDF = function (callback) {
		$http.get(urlTipo + '/topdf')
			.success(function (response) {
				callback(response);
			});
	};

	return service;
});
