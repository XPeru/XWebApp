"use strict";

angular.module('Cliente', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('clienteController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'ClienteServiceFactory',
													'NgTableParams',
													'i18nService',
													'TipoPersonaServiceFactory',
													'CommonServiceFactory',
		function($scope, $location, $http, $uibModal, $timeout, ClienteServiceFactory, NgTableParams, i18nService, TipoPersonaServiceFactory, CommonServiceFactory) {
			var ctrl = this;
			i18nService.setCurrentLang('es');

			ctrl.clienteData = [{}];
			ctrl.callGetAll = function() {
				ClienteServiceFactory.getAllCliente().then(function(response) {
					ctrl.clienteData = response.data.Persona;
					$scope.gridOptions.data = response.data.Persona;
					ctrl.table = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.clienteData
					});
				});
			};
			ctrl.callGetAll();
			ctrl.tableMode = true;
			ctrl.idSelectedCliente = null;

			ctrl.callGetTipoPersonaByDesc = function() {
				TipoPersonaServiceFactory.getTipoPersonaByDesc('Cliente').then(function(response) {
					ctrl.tipoPersona = response.data.TipoPersona;
				});
			};
			ctrl.callGetTipoPersonaByDesc();

			ctrl.modal = {
				url: {
					create : 'dev/modules/Cliente/modals/createCliente.html',
					edit: 'dev/modules/Cliente/modals/editCliente.html',
					delete: 'dev/modules/Cliente/modals/deleteCliente.html'
				},
				controller: 'modalClienteController',
				controllerAs: 'modalClienteCtrl',
				id: 'ID_PROVEEDOR_CLIENTE',
				ctrlParent: ctrl
			};

			CommonServiceFactory.modal(ctrl);
			CommonServiceFactory.switchTableMode(ctrl);
			CommonServiceFactory.setSelected(ctrl, "idSelectedCliente");

			$scope.columns = [
				CommonServiceFactory.formatColumn('Nombre','NOMBRE','blue','text'),
				CommonServiceFactory.formatColumn('Email','EMAIL','blue','text'),
				CommonServiceFactory.formatColumn('RUC','RUC','blue','text'),
				CommonServiceFactory.formatColumn('Numero de cuenta','NUMERO_CUENTA','blue','text'),
				CommonServiceFactory.formatColumn('Calle','DIRECCION_CALLE','blue','text'),
				CommonServiceFactory.formatColumn('Distrito','DIRECCION_DISTRITO','blue','text'),
				CommonServiceFactory.formatColumn('Departamento','DIRECCION_DEPARTAMENTO','blue','text'),
				CommonServiceFactory.formatColumn('Complemento','DIRECCION_COMPLEMENTO','blue','text'),
				CommonServiceFactory.formatColumn('Telefono','TELEFONO','blue','text'),
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
				}
			};
		}
]);
