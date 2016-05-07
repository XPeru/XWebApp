var ingresos = angular.module('Ingresos', ['ui.bootstrap']);

ingresos.controller('ingresosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
	'IngresosServiceFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, IngresosServiceFactory, NgTableParams) {
		$scope.idSelectedIngreso = null;
		$scope.setSelected = function(idSelectedIngreso) {
			$scope.idSelectedIngreso = idSelectedIngreso;
		};
		$scope.ingresosData = [{}];
		$scope.modal_not_finished = true;
		$scope.ingresosTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.modal_not_finished) {
						$scope.callGetAllIngresos();
					} else {
						params.total($scope.ingresosData.length);
						return $scope.ingresosData;
					}
					$scope.modal_not_finished = false;
			}
			
		});

		$scope.callGetAllIngresos = function() {
			IngresosServiceFactory.getAllIngresos(function(response) {
					$timeout(function() {
						$scope.ingresosData = response;
						$scope.ingresosTable.reload();
					}, 200);
			});
		};

		$scope.openModal = function(selected_modal, selected_ingreso) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/Ingresos/modals/createIngreso.html';
							break;
						case "edit":
							template = 'dev/modules/Ingresos/modals/editIngreso.html';
							break;
						case "delete":
							template = 'dev/modules/Ingresos/modals/deleteIngreso.html';
							break;
					}
					return template;
				},
				controller: 'ModalIngreso',
				resolve : {
					selected_ingreso : function() {
						return selected_ingreso;
					}
				}
			});

			modalInstance.result.then(function() {
				$scope.modal_not_finished = true;
				$scope.ingresosTable.reload();
				
			}, function() {
				$scope.modal_not_finished = true;
			});
		};
}]);

ingresos.controller('ModalIngreso', function($scope, $http, $timeout, $uibModalInstance, selected_ingreso, IngresosServiceFactory) {
	$scope.selected_ingreso = selected_ingreso;

	$scope.deleteIngreso = function(ingreso_deleted) {
		IngresosServiceFactory.deleteIngreso(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, ingreso_deleted);
	};

    $scope.editIngreso = function (ingreso_edited) {
		IngresosServiceFactory.editIngreso(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, ingreso_edited);
    };

    $scope.createIngreso = function (ingreso_created) {
		IngresosServiceFactory.createIngreso(function(response) {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, ingreso_created);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
});