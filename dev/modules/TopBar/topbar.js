angular.module('TopBar', [])
	
	.controller('topbarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$("#menu").metisMenu();
	}])

	.directive('xwebappLateralBar',
		function() {
			return {
				controller: 'topbarController',
				restrict: 'E',
				templateUrl: 'dev/modules/TopBar/topbar.html',
				scope: {
					usuarios: '@',
					usuariotipo: '@',
					usuarioacceso: '@'
				}
			};
		});
