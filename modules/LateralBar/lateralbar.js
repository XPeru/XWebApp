angular.module('LateralBar', [])
	
	.controller('lateralbarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$("#menu").metisMenu();
	}])

	.directive('xwebappLateralBar',
		function() {
			return {
				controller: 'lateralbarController',
				restrict: 'E',
				templateUrl: 'modules/LateralBar/lateralbar.html',
				scope: {
					
				}
			};
		});
