angular.module('Proveedor').controller('modalProveedorController',  function ($scope, $http, $timeout, $uibModalInstance, selectedProveedor, tipoPersona, ProveedorServiceFactory) {
	var ctrl = this;
	ctrl.selectedProveedor = selectedProveedor;
	ctrl.tipoPersona = tipoPersona[0];

	ctrl.createProveedor = function (create_proveedor) {
		create_proveedor.FK_TIPO_PERSONA = ctrl.tipoPersona.ID_TIPO_PERSONA;
		console.info(create_proveedor);
		ProveedorServiceFactory.createProveedor(create_proveedor).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.updateProveedor = function (update_proveedor) {
		ProveedorServiceFactory.updateProveedor(update_proveedor).then(function() {
			$uibModalInstance.close();
		});
    };

    ctrl.deleteProveedor = function(delete_proveedor) {
		ProveedorServiceFactory.deleteProveedor(delete_proveedor).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
    };

});