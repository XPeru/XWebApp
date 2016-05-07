var usuarios = angular.module('Usuarios', ['ui.bootstrap']);
//el orden de las variables tiene que ser el mismo en la declaracion de estas, y dentro de la funcion que define al controlador
usuarios.controller('usuariosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
											'UsuariosServiceFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, UsuariosServiceFactory, NgTableParams) {

		$scope.usersData = [{}];
		$scope.modal_user_not_finished = true;
		$scope.usersTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.modal_user_not_finished) {
						$scope.callGetAllUsers();
					} else {
						params.total($scope.usersData.length);

						/*return $scope.usersData.slice(
							(params.page() - 1) * params.count(),
							params.page() * params.count()
							);*/
						return $scope.usersData;
					}
					$scope.modal_user_not_finished = false;
			}
			
		});

		$scope.callGetAllUsers = function() {
			UsuariosServiceFactory.getAllUsers(function(response) {
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
							template = 'dev/modules/Usuarios/modals/createUsuario.html';
							break;
						case "edit":
							template = 'dev/modules/Usuarios/modals/editUsuario.html';
							break;
						case "delete":
							template = 'dev/modules/Usuarios/modals/deleteUsuario.html';
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
				$scope.usersTable.reload();
				
			}, function() {
				$scope.modal_user_not_finished = true;
			});
		};

	}
]);

usuarios.controller('ModalUser',  function($scope, $http, $timeout, $uibModalInstance, selected_user, UsuariosServiceFactory) {
	//TODO comprobar si esto es realmente necesario o no
	$scope.selected_user = selected_user;

	$scope.deleteUser = function(user_to_delete) {
		UsuariosServiceFactory.deleteUser(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, user_to_delete);
	};

    $scope.updateUser = function (updated_user) {
		UsuariosServiceFactory.updateUser(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, updated_user);
    };

    $scope.createUser = function (user_created) {
		UsuariosServiceFactory.createUser(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, user_created);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});
