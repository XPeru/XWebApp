angular.module('NavBar', [])
	
	.controller('navBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {

	}
	])

	.directive('xwebappNavBar',
		function() {
			return {
				controller: 'navBarController',
				restrict: 'E',
				templateUrl: 'dev/modules/NavBar/nav.html',
				scope: {
					home: '@',
					usuarios: '@',
					articulos: '@',
					almacenes: '@',
					ingresos: '@',
					salidas: '@'
				}
			};
		});
