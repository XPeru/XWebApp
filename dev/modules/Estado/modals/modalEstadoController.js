angular.module('Estado').controller('modalEstadoController',  function ($scope, $http, $timeout, $uibModalInstance, selectedEstado, EstadoServiceFactory) {
	var ctrl = this;
	ctrl.selectedEstado = selectedEstado;

	ctrl.createEstado = function (create_estado) {
		EstadoServiceFactory.createEstado(create_estado).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.updateEstado = function (update_estado) {
		EstadoServiceFactory.updateEstado(update_estado).then(function() {
			$uibModalInstance.close();
		});
    };

    ctrl.deleteEstado = function(delete_estado) {
		EstadoServiceFactory.deleteEstado(delete_estado).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
    };

});