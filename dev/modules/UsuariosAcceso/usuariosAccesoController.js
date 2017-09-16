"use strict";
angular.module('UsuariosAcceso', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('usuariosAccesoController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'UsuariosAccesoServiceFactory',
													'NgTableParams',
													'i18nService',
													'CommonServiceFactory',
		function ($scope, $location, $http, $uibModal, $timeout, UsuariosAccesoServiceFactory, NgTableParams, i18nService, CommonServiceFactory) {
			var ctrl = this;
			i18nService.setCurrentLang('es');

			ctrl.callGetAll = function() {
				UsuariosAccesoServiceFactory.getAllAccesoUsuario().then(function(response) {
					ctrl.usuariosAccesoData = response.data.AccesosUsuario;
					$scope.gridOptions.data = response.data.AccesosUsuario;
					ctrl.table = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.usuariosAccesoData
					});
				});
			};

			ctrl.modal = {
				url: {
					create : 'dev/modules/UsuariosAcceso/modals/createUsuarioAcceso.html',
					edit: 'dev/modules/UsuariosAcceso/modals/editUsuarioAcceso.html',
					delete: 'dev/modules/UsuariosAcceso/modals/deleteUsuarioAcceso.html'
				},
				controller: 'modalUsuarioAccesoController',
				controllerAs: 'modalUsuarioAccesoCtrl',
				id: 'ID_ACCESO_USUARIO',
				ctrlParent: ctrl
			};

			CommonServiceFactory.modal(ctrl);
			CommonServiceFactory.switchTableMode(ctrl);
			CommonServiceFactory.setSelected(ctrl, "idSelectedAccesoUsuario");

			ctrl.tableMode = true;
			ctrl.idSelectedAccesoUsuario = null;
			ctrl.usuariosAccesoData = [];
			ctrl.callGetAll();

			$scope.columns = [
				CommonServiceFactory.formatColumn('Descripcion','DESCRIPCION', 'blue', 'text'),
				CommonServiceFactory.buttons()
			];

			$scope.gridOptions = {
				exporterMenuCsv: false,
				enableGridMenu: true,
				enableSorting: true,
				enableFiltering: true,
				columnDefs: $scope.columns,
				onRegisterApi: function(gridApi) {
					$scope.gridApi = gridApi;
					/*gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
						$scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
					});*/
				}
			};
		}
]);
