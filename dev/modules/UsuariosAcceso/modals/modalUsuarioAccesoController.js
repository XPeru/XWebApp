"use strict";
angular.module('UsuariosAcceso')
	.controller('modalUsuarioAccesoController',
		function($scope, $http, $timeout, $uibModalInstance, selected_acceso_usuario, UsuariosAccesoServiceFactory) {
			var ctrl = this;
			ctrl.selected_acceso_usuario = selected_acceso_usuario;

			ctrl.deleteAccesoUsuario = function(acceso_usuario) {
				UsuariosAccesoServiceFactory.deleteAccesoUsuario(acceso_usuario.ID_ACCESO_USUARIO).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.updateAccesoUsuario = function (acceso_usuario) {
				UsuariosAccesoServiceFactory.updateAccesoUsuario(acceso_usuario).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.createAccesoUsuario = function (acceso_usuario) {
				UsuariosAccesoServiceFactory.createAccesoUsuario(acceso_usuario).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
);