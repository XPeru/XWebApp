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
			// ctrl.setSelected = function(idSelectedCliente) {
			// 	ctrl.idSelectedCliente = idSelectedCliente;
			// };

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

			// ctrl.openModalCliente = function(selected_modal, selectedCliente) {
			// 	var modalInstance = $uibModal.open({
			// 		templateUrl: function() {
			// 			var template;
			// 			switch(selected_modal) {
			// 				case "create":
			// 					template = 'dev/modules/Cliente/modals/createCliente.html';
			// 					break;
			// 				case "edit":
			// 					template = 'dev/modules/Cliente/modals/editCliente.html';
			// 					break;
			// 				case "delete":
			// 					template = 'dev/modules/Cliente/modals/deleteCliente.html';
			// 					break;
			// 			}
			// 			return template;
			// 		},
			// 		controller: 'modalClienteController',
			// 		controllerAs: 'modalClienteCtrl',
			// 		resolve : {
			// 			selectedCliente : function() {
			// 				return selectedCliente;
			// 			},
			//
			// 			tipoPersona: function() {
			// 				return ctrl.tipoPersona;
			// 			}
			// 		}
			// 	});
			//
			// 	modalInstance.result.then(function() {
			// 		ctrl.callGetAllCliente();
			// 		ctrl.clienteTable.reload();
			// 	}, function() {
			// 		ctrl.callGetAllCliente();
			// 		ctrl.clienteTable.reload();
			// 	});
			// };


			// ctrl.switchTableMode = function() {
			// 	ctrl.tableMode = !ctrl.tableMode;
			// };

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

			// $scope.columns = [{ field: 'NOMBRE', headerCellClass: 'blue'},
			// 					{ field: 'EMAIL', headerCellClass: 'blue'},
			// 					{ field: 'RUC', headerCellClass: 'blue'},
			// 					{ field: 'NUMERO_CUENTA', headerCellClass: 'blue'},
			// 					{ field: 'DIRECCION_CALLE', headerCellClass: 'blue'},
			// 					{ field: 'DIRECCION_DISTRITO', headerCellClass: 'blue'},
			// 					{ field: 'DIRECCION_DEPARTAMENTO', headerCellClass: 'blue'},
			// 					{ field: 'DIRECCION_COMPLEMENTO', headerCellClass: 'blue'},
			// 					{ field: 'TELEFONO', headerCellClass: 'blue'}];
			// $scope.columns[0].displayName = 'Nombre';
			// $scope.columns[1].displayName = 'Email';
			// $scope.columns[2].displayName = 'RUC';
			// $scope.columns[3].displayName = 'Numero de cuenta';
			// $scope.columns[4].displayName = 'Calle';
			// $scope.columns[5].displayName = 'Distrito';
			// $scope.columns[6].displayName = 'Departamento';
			// $scope.columns[7].displayName = 'Complemento';
			// $scope.columns[8].displayName = 'Telefono';

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
