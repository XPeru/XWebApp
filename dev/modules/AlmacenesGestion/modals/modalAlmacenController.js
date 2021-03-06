angular.module('AlmacenesGestion').controller('modalAlmacenController',
	function($scope, $http, $timeout, $uibModalInstance, selectedData, AlmacenesGestionServiceFactory) {
		var ctrl = this;
		ctrl.selected_almacen = selectedData;

		ctrl.deleteAlmacen = function(almacen_deleted) {
			AlmacenesGestionServiceFactory.deleteAlmacen(almacen_deleted).then(function() {
				$uibModalInstance.close();
			});
		};

		ctrl.editAlmacen = function(almacen_edited) {
			AlmacenesGestionServiceFactory.editAlmacen(almacen_edited).then(function() {
				$uibModalInstance.close();
			});
		};

		ctrl.createAlmacen = function(almacen_created) {
			AlmacenesGestionServiceFactory.createAlmacen(almacen_created).then(function() {
				$uibModalInstance.close();
			});
		};

		ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
});
