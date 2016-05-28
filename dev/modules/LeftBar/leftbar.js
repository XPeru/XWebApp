angular.module('LeftBar', [])
	
	.controller('leftbarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$("#menu").metisMenu();
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