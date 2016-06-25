var almacenesGestion = angular.module('AlmacenesGestion', ['ui.bootstrap']);

almacenesGestion.controller('almacenesGestionController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
	'AlmacenesGestionServiceFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, AlmacenesGestionServiceFactory, NgTableParams) {
		$scope.idSelectedAlmacen = null;
		$scope.setSelected = function(idSelectedAlmacen) {
			$scope.idSelectedAlmacen = idSelectedAlmacen;
		};
		$scope.almacenesData = [{}];
		$scope.modal_not_finished = true;
		$scope.almacenesTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.modal_not_finished) {
						$scope.callGetAllAlmacenes();
					} else {
						params.total($scope.almacenesData.length);
						return $scope.almacenesData;
					}
					$scope.modal_not_finished = false;
			}
			
		});

		$scope.callGetAllAlmacenes = function() {
			AlmacenesGestionServiceFactory.getAllAlmacenes(function(response) {
					$timeout(function() {
						$scope.almacenesData = response;
						$scope.almacenesTable.reload();
					}, 200);
			});
		};

		$scope.openModal = function(selected_modal, selected_almacen) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/AlmacenesGestion/modals/createAlmacen.html';
							break;
						case "edit":
							template = 'dev/modules/AlmacenesGestion/modals/editAlmacen.html';
							break;
						case "delete":
							template = 'dev/modules/AlmacenesGestion/modals/deleteAlmacen.html';
							break;
					}
					return template;
				},
				controller: 'ModalAlmacen',
				resolve : {
					selected_almacen : function() {
						return selected_almacen;
					}
				}
			});

			modalInstance.result.then(function() {
				$scope.modal_not_finished = true;
				$scope.almacenesTable.reload();
				
			}, function() {
				$scope.modal_not_finished = true;
			});
		};
}]);

almacenesGestion.controller('ModalAlmacen', function($scope, $http, $timeout, $uibModalInstance, selected_almacen, AlmacenesGestionServiceFactory) {
	$scope.selected_almacen = selected_almacen;

	$scope.deleteAlmacen = function(almacen_deleted) {
		AlmacenesGestionServiceFactory.deleteAlmacen(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, almacen_deleted);
	};

    $scope.editAlmacen = function (almacen_edited) {
		AlmacenesGestionServiceFactory.editAlmacen(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, almacen_edited);
    };

    $scope.createAlmacen = function (almacen_created) {
		AlmacenesGestionServiceFactory.createAlmacen(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, almacen_created);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
});