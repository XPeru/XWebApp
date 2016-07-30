"use strict";
angular.module('UsuariosTipo')
	.controller('modalAssoTipoAccesoController',
		function($scope, $http, $timeout, $uibModalInstance, selected_tipo_usuario, UsuariosTipoServiceFactory) {
			var ctrl = this;
			ctrl.selected_tipo_usuario = selected_tipo_usuario;

			ctrl.updateAsso = function (tipo_usuario) {
				UsuariosTipoServiceFactory.updateTipoUsuario(tipo_usuario).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
);