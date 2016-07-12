angular.module('Home', [])

	.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
			$scope.comment ="this is usless";
		$rootScope.comment ="this is usless";
	}]);