var userList = angular.module('UserList', ['ui.bootstrap']);

// .controller('userListController', ['$scope', 'UsersFactory', 'UserFactory', '$location', '$http',
//function ($scope, UsersFactory, UserFactory, $location, $http) {
userList.controller('userListController', ['$scope', '$location', '$http', '$modal',
	function($scope, $location, $http, $modal) {
		$scope.items = ['item1', 'item2', 'item3'];
		
		// callback for ng-click 'editUser':
		// $scope.editUser = function (userId) {
		//     $location.path('/user-detail/' + userId);
		// };

		// callback for ng-click 'deleteUser':
		$scope.deleteUser = function(userEmail) {
			UserFactory.delete({
				user_email: userEmail
			});
			$scope.users = UsersFactory.query();
		};
		$http.delete('/api/userlist').then(function(result) {
			$scope.users = result.data.Users;
		});
		// $scope.deleteUser = function (userEmail) {
		//     UserFactory.delete({ user_email: userEmail });
		//     $scope.users = UsersFactory.query();
		// };

		// callback for ng-click 'createUser':
		$scope.createNewUser = function() {
			var modalInstance = $modal.open({
				templateUrl: 'modules/UserList/modal.html',
				controller: 'ModalInstanceCtrl',
				resolve: {
					items: function() {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				$scope.selected = selectedItem;
			}, function() {
				//$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$http.get('/api/userlist').then(function(result) {
			$scope.users = result.data.Users;
		});
	}
]);

userList.controller('ModalInstanceCtrl',  function($scope, $modalInstance, items) {
	console.info("controlador modal");
	console.info(items);
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});
