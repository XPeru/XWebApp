"use strict";
var almacenesGestion = angular.module('AlmacenesGestion', ['ui.bootstrap']);

almacenesGestion.controller('almacenesGestionController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
	'AlmacenesGestionServiceFactory', 'NgTableParams',
	function($scope, $location, $http, $uibModal, $timeout, AlmacenesGestionServiceFactory, NgTableParams) {
		$scope.sortType     = 'ID_ALMACEN'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        
        $scope.setType = function(type) {
            $scope.sortType = type;
            $scope.sortReverse = !$scope.sortReverse;
        };

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
			AlmacenesGestionServiceFactory.getAllAlmacenes().then( function(response) {
					$scope.almacenesData = response.data;
					$scope.almacenesTable.reload();
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
		AlmacenesGestionServiceFactory.deleteAlmacen(almacen_deleted).then( function() {
			$uibModalInstance.close();
		});
	};

    $scope.editAlmacen = function (almacen_edited) {
		AlmacenesGestionServiceFactory.editAlmacen(almacen_edited).then( function() {
			$uibModalInstance.close();
		});
    };

    $scope.createAlmacen = function (almacen_created) {
		AlmacenesGestionServiceFactory.createAlmacen(almacen_created).then( function() {
			$uibModalInstance.close();
		});
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
});