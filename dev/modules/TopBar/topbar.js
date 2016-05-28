angular.module('TopBar', [])
	
	.controller('topbarController', ['$scope', '$rootScope', function ($scope, $rootScope) {

	}])

	.directive('topBar',
		function() {
			return {
				controller: 'topbarController',
				restrict: 'E',
				templateUrl: 'dev/modules/TopBar/topbar.html',
				scope: {
				}
			};
		});
