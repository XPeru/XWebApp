"use strict";

angular.module('Proveedor', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('proveedorController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'ProveedorServiceFactory',
													'NgTableParams',
													'i18nService',
													'TipoPersonaServiceFactory',
		function($scope, $location, $http, $uibModal, $timeout, ProveedorServiceFactory, NgTableParams, i18nService, TipoPersonaServiceFactory) {
			var ctrl = this;
			ctrl.tableMode = true;
			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: 'NOMBRE', headerCellClass: 'blue'},
					{ field: 'EMAIL', headerCellClass: 'blue'},
					{ field: 'RUC', headerCellClass: 'blue'},
					{ field: 'NUMERO_CUENTA', headerCellClass: 'blue'},
					{ field: 'DIRECCION_CALLE', headerCellClass: 'blue'},
					{ field: 'DIRECCION_DISTRITO', headerCellClass: 'blue'},
					{ field: 'DIRECCION_DEPARTAMENTO', headerCellClass: 'blue'},
					{ field: 'DIRECCION_COMPLEMENTO', headerCellClass: 'blue'},
					{ field: 'TELEFONO', headerCellClass: 'blue'}];
			$scope.columns[0].displayName = 'Nombre';
			$scope.columns[1].displayName = 'Email';
			$scope.columns[2].displayName = 'RUC';
			$scope.columns[3].displayName = 'Numero de cuenta';
			$scope.columns[4].displayName = 'Calle';
			$scope.columns[5].displayName = 'Distrito';
			$scope.columns[6].displayName = 'Departamento';
			$scope.columns[7].displayName = 'Complemento';
			$scope.columns[8].displayName = 'Telefono';
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

			ctrl.proveedorData = [{}];
			ctrl.callGetAllProveedor = function() {
				ProveedorServiceFactory.getAllProveedor().then(function(response) {
					ctrl.proveedorData = response.data.Persona;
					console.info(ctrl.proveedorData);
					$scope.gridOptions.data = response.data.Persona;
					ctrl.proveedorTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.proveedorData
					});
				});
			};
			ctrl.callGetAllProveedor();

			ctrl.idSelectedProveedor = null;
			ctrl.setSelected = function(idSelectedProveedor) {
				ctrl.idSelectedProveedor = idSelectedProveedor;
			};

			ctrl.callGetTipoPersonaByDesc = function() {
				TipoPersonaServiceFactory.getTipoPersonaByDesc('Proveedor').then(function(response) {
					ctrl.tipoPersona = response.data.TipoPersona;
				});
			};
			ctrl.callGetTipoPersonaByDesc();

			ctrl.openModalProveedor = function(selected_modal, selectedProveedor) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/Proveedor/modals/createProveedor.html';
								break;
							case "edit":
								template = 'dev/modules/Proveedor/modals/editProveedor.html';
								break;
							case "delete":
								template = 'dev/modules/Proveedor/modals/deleteProveedor.html';
								break;
						}
						return template;
					},
					controller: 'modalProveedorController',
					controllerAs: 'modalProveedorCtrl',
					resolve : {
						selectedProveedor : function() {
							return selectedProveedor;
						},

						tipoPersona: function() {
							return ctrl.tipoPersona;
						}
					}
				});

				modalInstance.result.then(function() {
					ctrl.callGetAllProveedor();
					ctrl.proveedorTable.reload();
				}, function() {
					ctrl.callGetAllProveedor();
					ctrl.proveedorTable.reload();
				});
			};
		}
]);