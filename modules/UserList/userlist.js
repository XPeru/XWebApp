var userList = angular.module('UserList', ['ui.bootstrap']);
//el orden de las variables tiene que ser el mismo en la declaracion de estas, y dentro de la funcion que define al controlador
userList.controller('userListController', ['$scope', '$location', '$http', '$uibModal', '$timeout', 'UserServicesFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, UserServicesFactory, NgTableParams) {

		$scope.usersData = [{}];
		$scope.modal_user_not_finished = true;
		$scope.usersTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.usersData.length == 1 || $scope.modal_user_not_finished) {
						$scope.callGetAllUsers();
					} else {
						params.total($scope.usersData.length);

						/*return $scope.usersData.slice(
							(params.page() - 1) * params.count(),
							params.page() * params.count()
							);*/
						console.info($scope.usersData);
						return $scope.usersData;
					}
					$scope.modal_user_not_finished = false;
			}
			
		});

		$scope.callGetAllUsers = function() {
			UserServicesFactory.getAllUsers(function(response) {
					$timeout(function() {
						$scope.usersData = response;
						$scope.usersTable.reload();
					}, 200);
			});
		};

		$scope.openModalUser = function(selected_modal, selected_user) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'modules/UserList/modalCreationUser.html';
							break;
						case "edit":
							template = 'modules/UserList/modalEditionUser.html';
							break;
						case "delete":
							template = 'modules/UserList/modalDeleteUser.html';
							break;
					}
					return template;
				},
				controller: 'ModalUser',
				resolve : {
					selected_user : function() {
						return selected_user;
					}
				}
			});

			modalInstance.result.then(function() {
				$scope.modal_user_not_finished = true;
				//$scope.is_rec_selected = false;
				$scope.usersTable.reload();
				
			}, function() {
				$scope.modal_user_not_finished = true;
				//$scope.usersTable.reload();
			});
		};
/*
		$http.get('/api/userlist').then(function(result) {
			$scope.users = result.data.Users;
		});*/
	}
]);

userList.controller('ModalUser',  function($scope, $http, $timeout, $uibModalInstance, selected_user) {
	console.info("controlador modal");
	$scope.selected_user = selected_user;
	console.info("este es el usuario");
	console.info(selected_user);



    $scope.editUser = function (editUser) {
		console.info("editing user");
		console.info(editUser);
	//	console.info($scope.selected_user);
    };

    $scope.createUser = function (user_created) {
		console.info("creating user");
		console.info(user_created);

		$http.post('/api/users', user_created).then(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, user_created);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});
