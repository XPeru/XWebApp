/*global $*/
"use strict";
angular.module('LeftBar', [])
	
	.controller('leftbarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$("#menu").metisMenu();
		$scope.comment ="this is usless";
		$rootScope.comment ="this is usless";
	}])

	.directive('leftBar',
		function() {
			return {
				controller: 'leftbarController',
				restrict: 'E',
				templateUrl: 'dev/modules/LeftBar/leftbar.html',
				scope: {
					usuarios: '@',
					usuariotipo: '@',
					usuarioacceso: '@'
				}
			};
		});