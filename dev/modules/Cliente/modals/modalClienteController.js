angular.module('Cliente').controller('modalClienteController',
	function ($scope, $http, $timeout, $uibModalInstance, selectedData, extraData, ClienteServiceFactory) {
		var ctrl = this;
		ctrl.selectedCliente = selectedData;
		ctrl.tipoPersona = extraData[0];

		ctrl.createCliente = function (cliente) {
			cliente.FK_TIPO_PERSONA = ctrl.tipoPersona.ID_TIPO_PERSONA;
			ClienteServiceFactory.createCliente(cliente).then(function() {
				$uibModalInstance.close();
			});
		};

		ctrl.editCliente = function(cliente) {
			ClienteServiceFactory.editCliente(cliente).then(function() {
				$uibModalInstance.close();
			});
		};

		ctrl.deleteCliente = function(cliente) {
			ClienteServiceFactory.deleteCliente(cliente).then(function() {
				$uibModalInstance.close();
			});
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

});
