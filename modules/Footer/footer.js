angular.module('Footer', [])
	
	.controller('footerController', ['$scope', '$rootScope', function ($scope, $rootScope) {

	}])

	.directive('xwebappFooter',
		function() {
			return {
				controller: 'footerController',
				restrict: 'E',
				templateUrl: 'modules/Footer/footer.html',
				scope: {}
			};
		});