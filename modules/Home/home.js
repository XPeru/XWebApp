angular.module('Home', [])

	.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		console.info('Home');
	}]);

	// .controller('homeController', ['$scope', '$timeout', 'homeInitialService',

	// 	function($scope, $timeout, homeInitialService) {
	// 		console.info('accesing to home controller');
			
	// 		homeInitialService.getOrders(function(response) {
	// 			$timeout(function() {
	// 				$scope.orders = response;
	// 			}, 200);
	// 		});
	// 		console.info('orders:');
	// 		console.info($scope.orders);
	// 	}
	// ]);