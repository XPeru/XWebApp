var articulosCategoria = angular.module('ArticulosCategoria', ['ui.bootstrap']);

articulosCategoria.controller('articulosCategoriaController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
	'ArticulosCategoriaServiceFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosCategoriaServiceFactory, NgTableParams) {
		$scope.sortType     = 'ID_CATEGORIA'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.setType = function(type) {
            $scope.sortType = type;
            $scope.sortReverse = !$scope.sortReverse;
        };

		$scope.idSelectedCategoria = null;
		$scope.setSelected = function(idSelectedCategoria) {
			$scope.idSelectedCategoria = idSelectedCategoria;
		};
		$scope.categoriasData = [{}];
		$scope.modal_not_finished = true;
		$scope.categoriasTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.modal_not_finished) {
						$scope.callGetAllCategorias();
					} else {
						params.total($scope.categoriasData.length);
						return $scope.categoriasData;
					}
					$scope.modal_not_finished = false;
			}
		});

		$scope.callGetAllCategorias = function() {
			ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
				$scope.categoriasData = response.data;
				$scope.categoriasTable.reload();
			});
		};

		$scope.openModal = function(selected_modal, selected_categoria) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/ArticulosCategoria/modals/createCategoria.html';
							break;
						case "edit":
							template = 'dev/modules/ArticulosCategoria/modals/editCategoria.html';
							break;
						case "delete":
							template = 'dev/modules/ArticulosCategoria/modals/deleteCategoria.html';
							break;
					}
					return template;
				},
				controller: 'ModalCategoria',
				resolve : {
					selected_categoria : function() {
						return selected_categoria;
					}
				}
			});

			modalInstance.result.then(function() {
				$scope.modal_not_finished = true;
				$scope.categoriasTable.reload();
			}, function() {
				$scope.modal_not_finished = true;
			});
		};
}]);

articulosCategoria.controller('ModalCategoria', function($scope, $http, $timeout, $uibModalInstance, selected_categoria, ArticulosCategoriaServiceFactory) {
	$scope.selected_categoria = selected_categoria;

	$scope.deleteCategoria = function(categoria_deleted) {
		ArticulosCategoriaServiceFactory.deleteCategoria(categoria_deleted).then(function() {
			$uibModalInstance.close();
		});
	};

    $scope.editCategoria = function (categoria_edited) {
		ArticulosCategoriaServiceFactory.editCategoria(categoria_edited).then(function() {
			$uibModalInstance.close();
		});
    };

    $scope.createCategoria = function (categoria_created) {
		ArticulosCategoriaServiceFactory.createCategoria(categoria_created).then(function() {
			$uibModalInstance.close();
		});
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
});