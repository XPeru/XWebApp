var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('UserServicesFactory', function($http) {
	var service = {};
	var urlBase = '/api';

	service.getAllUsers = function(callback) {
		$http.get(urlBase + '/userlist')
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
