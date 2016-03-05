angular.module('NavBar', [])
	
	.controller('navBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		//console.info('Navigation Bar');
	}])

	.directive('xwebappNavBar',
		function() {
			return {
				controller: 'navBarController',
				restrict: 'E',
				templateUrl: 'modules/NavBar/nav.html',
				scope: {
					home: '@',
					userlist: '@',
					articulos: '@',
					almacenes: '@'
				}
			};
		});
