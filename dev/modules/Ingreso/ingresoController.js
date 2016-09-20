"use strict";

angular.module('Ingreso', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('ingresoController', ['$scope',
									'$rootScope',
									'$location',
									'$http',
									'$uibModal',
									'$timeout',
									'IngresoServiceFactory',
									'TipoDocumentoServiceFactory',
									'ProveedorServiceFactory',
									'NgTableParams',
									'i18nService',
		function($scope, $rootScope, $location, $http, $uibModal, $timeout, IngresoServiceFactory, TipoDocumentoServiceFactory, ProveedorServiceFactory, NgTableParams, i18nService) {
			var ctrl = this;
			ctrl.tableMode = true;
			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			ctrl.callGetAllTipoDocumento = function() {
			TipoDocumentoServiceFactory.getAllTipoDocumento().then(function(response) {
				ctrl.tipoDocumentoList = response.data.TipoDocumento;
				});
			};
			ctrl.callGetAllTipoDocumento();

			
			ctrl.callGetAllProveedor = function() {
				ProveedorServiceFactory.getAllProveedor().then(function(response) {
					ctrl.proveedorList = response.data.Persona;
				});
			};
			ctrl.callGetAllProveedor();

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: 'CODE_INGRESO', headerCellClass: 'blue'},
								{ field: 'COSTO_TOTAL', headerCellClass: 'blue'},
								{ field: 'CREATE_USUARIO', headerCellClass: 'blue'},
								{ field: 'CREATE_TIME', headerCellClass: 'blue'},
								{ field: 'UPDATE_USUARIO', headerCellClass: 'blue'},
								{ field: 'NOMBRE_PROVEEDOR', headerCellClass: 'blue'},
								{ field: 'DESCRIPCION', headerCellClass: 'blue'}];

			$scope.columns[0].displayName = 'Codigo de Ingreso';
			$scope.columns[1].displayName = 'Costo Total';
			$scope.columns[2].displayName = 'Usuario creador';
			$scope.columns[3].displayName = 'Fecha de creacion';
			$scope.columns[4].displayName = 'Usuario update';
			$scope.columns[5].displayName = 'Proveedor';
			$scope.columns[6].displayName = 'Tipo de documento';
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

			ctrl.ingresoData = [{}];
			ctrl.callGetAllIngreso = function() {
				IngresoServiceFactory.getAllIngreso().then(function(response) {
					ctrl.ingresoData = response.data.Ingreso;
					$scope.gridOptions.data = response.data.Ingreso;
					ctrl.ingresoTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.ingresoData
					});
				});
			};
			ctrl.callGetAllIngreso();

			ctrl.detalleIngresoData = [{}];
			ctrl.callGetDetalleIngreso = function(id_ingreso) {
				IngresoServiceFactory.getDetalleIngreso(id_ingreso).then(function(response) {
					ctrl.detalleIngresoData = response.data.DetalleIngreso;
					ctrl.detalleIngresoTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.detalleIngresoData
					});
				});
			};

			ctrl.modeDetalle = true;
			ctrl.switchModeDetalle = function() {
				ctrl.modeDetalle = !ctrl.modeDetalle;
				$rootScope.toLeft = false;
			};

			ctrl.cancelModeDetalle = function() {
				ctrl.modeDetalle = true;
				$rootScope.toLeft = true;
			};

			ctrl.idSelectedIngreso = null;
			ctrl.setSelected = function(idSelectedIngreso) {
				ctrl.idSelectedIngreso = idSelectedIngreso;
				ctrl.callGetDetalleIngreso(idSelectedIngreso);
			};

			ctrl.openModalIngreso = function(selected_modal, selectedIngreso) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/Ingreso/modals/createIngreso.html';
								break;
							case "edit":
								template = 'dev/modules/Ingreso/modals/editIngreso.html';
								break;
							case "delete":
								template = 'dev/modules/Ingreso/modals/deleteIngreso.html';
								break;
						}
						return template;
					},
					controller: 'modalIngresoController',
					controllerAs: 'modalIngresoCtrl',
					resolve : {
						selectedIngreso : function() {
							return selectedIngreso;
						},
						tipoDocumentoList : function() {
							return ctrl.tipoDocumentoList;
						},
						proveedorList : function() {
							return ctrl.proveedorList;
						}
					}
				});

				modalInstance.result.then(function() {
					ctrl.callGetAllIngreso();
					ctrl.ingresoTable.reload();
				}, function() {
					ctrl.callGetAllIngreso();
					ctrl.ingresoTable.reload();
				});
			};
		}
]);