angular.module('Cliente').controller('modalClienteController',  function ($scope, $http, $timeout, $uibModalInstance, selectedCliente, tipoPersona, ClienteServiceFactory) {
	var ctrl = this;
	ctrl.selectedCliente = selectedCliente;
	ctrl.tipoPersona = tipoPersona[0];
    // Utilisar si la propiedad tipo o categoria corresponde
	//ctrl.tipoClienteList = tipoClienteList;

	ctrl.createCliente = function (create_cliente) {
		create_cliente.FK_TIPO_PERSONA = ctrl.tipoPersona.ID_TIPO_PERSONA;
		ClienteServiceFactory.createCliente(create_cliente).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.updateCliente = function (update_cliente) {
		ClienteServiceFactory.updateCliente(update_cliente).then(function() {
			$uibModalInstance.close();
		});
    };

    ctrl.deleteCliente = function(delete_cliente) {
		ClienteServiceFactory.deleteCliente(delete_cliente).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
    };

});