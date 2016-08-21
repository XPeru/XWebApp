"use strict";
angular.module('UsuariosTipo')
	.controller('modalAssoTipoAccesoController',
		function ($scope, $http, $timeout, $uibModalInstance, selectedTipoUsuario, selectedAssos, allAssos, UsuariosTipoServiceFactory) {
			var ctrl = this;
			ctrl.selectedTipoUsuario = selectedTipoUsuario;

			ctrl.updateAsso = function () {
				UsuariosTipoServiceFactory.updateTipoUsuario(selectedTipoUsuario).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
);