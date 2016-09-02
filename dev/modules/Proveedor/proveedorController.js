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
			$scope.columns = [{ field: '', headerCellClass: 'blue'}];
			$scope.columns[0].displayName = '';
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