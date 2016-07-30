"use strict";
angular.module('Footer', [])
	.controller('footerController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.comment ="this is usless";
		$rootScope.comment ="this is usless";
	}])

	.directive('xwebappFooter',
		function() {
			return {
				controller: 'footerController',
				restrict: 'E',
				templateUrl: 'dev/modules/Footer/footer.html',
				scope: {}
			};
		});