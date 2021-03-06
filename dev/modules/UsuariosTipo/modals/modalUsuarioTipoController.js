"use strict";
angular.module('UsuariosTipo')
	.controller('modalUsuarioTipoController',
		function($scope, $http, $timeout, $uibModalInstance, selectedData, UsuariosTipoServiceFactory) {

			var ctrl = this;
			ctrl.selected_tipo_usuario = selectedData;

			ctrl.deleteTipoUsuario = function(tipo_usuario) {
				UsuariosTipoServiceFactory.deleteTipoUsuario(tipo_usuario.ID_TIPO_USUARIO).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.updateTipoUsuario = function (tipo_usuario) {
				UsuariosTipoServiceFactory.updateTipoUsuario(tipo_usuario).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.createTipoUsuario = function (tipo_usuario) {
				UsuariosTipoServiceFactory.createTipoUsuario(tipo_usuario).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
);
