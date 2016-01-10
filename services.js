angular.module('services', ['ngResource'])

.factory('UsersFactory', function($resource) {
	return $resource('/api/userlist', {}, {
		query: {
			method: 'GET',
			isArray: true
		},
		create: {
			method: 'POST'
		}
	});
})

// .factory('UsersFactory', function ($resource) {
//     return $resource('/api/userlist', {}, {
//         query: { method: 'GET', isArray: true },
//         create: { method: 'POST' }
//     });
// })

.factory('UserFactory', function($resource) {
	return $resource('/api/users/:id', {}, {
		show: {
			method: 'GET'
		},
		update: {
			method: 'PUT',
			params: {
				id: '@id'
			}
		},
		delete: {
			method: 'DELETE',
			params: {
				id: '@id'
			}
		}
	});
});