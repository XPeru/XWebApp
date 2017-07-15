"use strict";
angular.module('NavBar', [])

	.controller('navBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
			$scope.comment ="this is usless";
			$rootScope.comment ="this is usless";
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
