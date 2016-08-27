"use strict";
angular.module('TipoPersona')
	.controller('modalTipoPersonaController',
		function($scope, $http, $timeout, $uibModalInstance, selectedTipoPersona, TipoPersonaServiceFactory) {
			var ctrl = this;
			ctrl.selectedTipoPersona = selectedTipoPersona;

			ctrl.deleteTipoPersona = function(tipoPersona) {
				TipoPersonaServiceFactory.deleteTipoPersona(tipoPersona.ID_TIPO_PERSONA).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.updateTipoPersona = function (tipoPersona) {
				TipoPersonaServiceFactory.updateTipoPersona(tipoPersona).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.createTipoPersona = function (tipoPersona) {
				TipoPersonaServiceFactory.createTipoPersona(tipoPersona).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
);