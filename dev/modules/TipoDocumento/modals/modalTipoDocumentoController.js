angular.module('TipoDocumento').controller('modalTipoDocumentoController',  function ($scope, $http, $timeout, $uibModalInstance, selectedTipoDocumento, TipoDocumentoServiceFactory) {
	var ctrl = this;
	ctrl.selectedTipoDocumento = selectedTipoDocumento;

	ctrl.createTipoDocumento = function (create_tipoDocumento) {
		TipoDocumentoServiceFactory.createTipoDocumento(create_tipoDocumento).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.updateTipoDocumento = function (update_tipoDocumento) {
		TipoDocumentoServiceFactory.updateTipoDocumento(update_tipoDocumento).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.deleteTipoDocumento = function(delete_tipoDocumento) {
		TipoDocumentoServiceFactory.deleteTipoDocumento(delete_tipoDocumento).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

});