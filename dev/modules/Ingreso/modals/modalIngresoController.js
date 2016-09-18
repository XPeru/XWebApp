angular.module('Ingreso').controller('modalIngresoController',  function ($scope, $http, $timeout, $uibModalInstance, selectedIngreso, IngresoServiceFactory, tipoDocumentoList, proveedorList) {
	var ctrl = this;
	ctrl.selectedIngreso = selectedIngreso;
	ctrl.tipoDocumentoList = tipoDocumentoList;
	ctrl.proveedorList = proveedorList;
	// Utilisar si la propiedad tipo o categoria corresponde
	//ctrl.tipoIngresoList = tipoIngresoList;

	ctrl.createIngreso = function(create_ingreso) {
		IngresoServiceFactory.createIngreso(create_ingreso).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.updateIngreso = function(update_ingreso) {
		IngresoServiceFactory.updateIngreso(update_ingreso).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.deleteIngreso = function(delete_ingreso) {
		IngresoServiceFactory.deleteIngreso(delete_ingreso).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

});