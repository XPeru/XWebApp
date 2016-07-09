var usuarios = angular.module('Usuarios', ['ui.bootstrap']);
//el orden de las variables tiene que ser el mismo en la declaracion de estas, y dentro de la funcion que define al controlador
usuarios.controller('usuariosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
											'UsuariosServiceFactory', 'NgTableParams', 'UsuariosTipoServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, UsuariosServiceFactory, NgTableParams, UsuariosTipoServiceFactory) {
		$scope.sortType     = 'ID_USUARIO'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.search   = '';     // set the default search/filter term
        $scope.setType = function(type, search) {
            $scope.sortType = type;
            $scope.sortReverse = !$scope.sortReverse;
            $scope.search = search;
        };

        $scope.idSelectedUsuario = null;
		$scope.setSelected = function(idSelectedUsuario) {
			$scope.idSelectedUsuario = idSelectedUsuario;
		};

		$scope.callGetAllTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAllTipoUsuario(function(response) {
				$timeout(function() {
					$scope.tipoUsuarioList = response.TiposUsuario;
					console.info(response);
				}, 200);
			});
		};

		$scope.callGetAllTipoUsuario();
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
						$scope.callGetUsuarioList();
					} else {
						params.total($scope.usersData.length);
						return $scope.usersData;
					}
					$scope.modal_user_not_finished = false;
			}
			
		});

		$scope.callGetUsuarioList = function() {
			UsuariosServiceFactory.getUsuarioList(function(response) {
				$timeout(function() {
					$scope.usersData = response;
					$scope.usersTable.reload();
				}, 200);
			});
		};

		

		$scope.openModalUsuario = function(selected_modal, selected_user) {
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
				controller: 'ModalUsuario',
				resolve : {
					selected_user : function() {
						return selected_user;
					},
					tipoUsuarioList : function() {
						return $scope.tipoUsuarioList;
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

usuarios.controller('ModalUsuario',  function ($scope, $http, $timeout, $uibModalInstance, selected_user, UsuariosServiceFactory, tipoUsuarioList) {
	//TODO comprobar si esto es realmente necesario o no
	$scope.selected_user = selected_user;
	$scope.tipoUsuarioList = tipoUsuarioList;
	$scope.deleteUsuario = function(user_to_delete) {
		UsuariosServiceFactory.deleteUsuario(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, user_to_delete);
	};

    $scope.updateUsuario = function (updated_user) {
		UsuariosServiceFactory.uploadPhotoUsuario(updated_user.FOTO_FILE).then(function(response) {
			updated_user.FOTO = response.data;
			UsuariosServiceFactory.updateUsuario(updated_user).then(function(response) {
				$uibModalInstance.close();
				console.info(response);
			}, function(response) {
				console.info(response.status + " " + response.statusText);
			});
		}, function(response) {
			console.info(response.status + " " + response.statusText);
		});
    };

	$scope.createUsuario = function (user_created) {
		UsuariosServiceFactory.uploadPhotoUsuario(user_created.FOTO_FILE).then(function(response) {
			user_created.FOTO = response.data;
			UsuariosServiceFactory.createUsuario(user_created).then(function(response) {
				$uibModalInstance.close();
				console.info(response);
			}, function(response) {
				console.info(response.status + " " + response.statusText);
			});
		}, function(response) {
			console.info(response.status + " " + response.statusText);
		});
	};

    $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
    };

}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);