var articulos = angular.module('Articulos', ['ui.bootstrap']);

articulos.controller('articulosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
	'ArticulosServiceFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams) {
		$scope.idSelectedArticulo = null;
		$scope.setSelected = function(idSelectedArticulo) {
			$scope.idSelectedArticulo = idSelectedArticulo;
		};
		$scope.articulosData = [{}];
		$scope.modal_not_finished = true;
		$scope.articulosTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.modal_not_finished) {
						$scope.callGetAllArticulos();
					} else {
						params.total($scope.articulosData.length);
						return $scope.articulosData;
					}
					$scope.modal_not_finished = false;
			}
			
		});

		$scope.callGetAllArticulos = function() {
			ArticulosServiceFactory.getAllArticulos(function(response) {
					$timeout(function() {
						$scope.articulosData = response;
						$scope.articulosTable.reload();
					}, 200);
			});
		};

		$scope.openModal = function(selected_modal, selected_articulo) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/Articulos/modals/createArticulo.html';
							break;
						case "edit":
							template = 'dev/modules/Articulos/modals/editArticulo.html';
							break;
						case "delete":
							template = 'dev/modules/Articulos/modals/deleteArticulo.html';
							break;
					}
					return template;
				},
				controller: 'ModalArticulo',
				resolve : {
					selected_articulo : function() {
						return selected_articulo;
					}
				}
			});

			modalInstance.result.then(function() {
				$scope.modal_not_finished = true;
				$scope.articulosTable.reload();
				
			}, function() {
				$scope.modal_not_finished = true;
			});
		};
}]);

articulos.controller('ModalArticulo', function($scope, $http, $timeout, $uibModalInstance, selected_articulo, ArticulosServiceFactory) {
	$scope.selected_articulo = selected_articulo;

	$scope.deleteArticulo = function(articulo_deleted) {
		ArticulosServiceFactory.deleteArticulo(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, articulo_deleted);
	};

    $scope.editArticulo = function (articulo_edited) {
		ArticulosServiceFactory.editArticulo(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, articulo_edited);
    };

    $scope.createArticulo = function (articulo_created) {
		ArticulosServiceFactory.createArticulo(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, articulo_created);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
});