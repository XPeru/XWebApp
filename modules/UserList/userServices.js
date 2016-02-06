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

	service.createUser = function(callback, newUser) {
		$http.post(urlBase + '/users', newUser)
			.success(function(response) {
				callback(response);
			});
	};

	service.updateUser = function(callback, updatedUser) {
		$http.put(urlBase + '/users', updatedUser)
			.success(function(response) {
				callback(response);
			});
	};
	//en un delete http request, solo hay un argumento, el url, que se suele completar 
	//con alguna informacion del usuario a eliminar, en este caso su email
	service.deleteUser = function(callback, deletedUser) {
		$http.delete(urlBase + '/deleteuser'+ '/' + deletedUser.user_email)
			.success(function(response) {
				callback(response);
			});
	};

	return service;
});
