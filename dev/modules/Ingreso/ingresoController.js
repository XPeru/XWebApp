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
									'ArticulosServiceFactory',
									'AlmacenesGestionServiceFactory',
									'NgTableParams',
									'i18nService',
		function ($scope, $rootScope, $location, $http, $uibModal, $timeout, IngresoServiceFactory, TipoDocumentoServiceFactory, ProveedorServiceFactory, ArticulosServiceFactory, AlmacenesGestionServiceFactory, NgTableParams, i18nService) {
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

			ctrl.callGetAllProveedor = function() {
				ProveedorServiceFactory.getAllProveedor().then(function(response) {
					ctrl.proveedorList = response.data.Persona;
				});
			};

			ctrl.callGetAllAlmacen = function() {
				AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {
					ctrl.almacenList = response.data.Almacenes;
				});
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

			ctrl.articuloData = [{}];
			ctrl.callGetArticuloList = function() {
				ArticulosServiceFactory.getArticuloList().then(function(response) {
					ctrl.articuloData = response.data.Articulos;
					ctrl.articuloTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data : ctrl.articuloData
					});
				});
			};

			ctrl.callGetAllTipoDocumento();
			ctrl.callGetAllProveedor();
			ctrl.callGetArticuloList();
			ctrl.callGetAllAlmacen();
			ctrl.callGetAllIngreso();

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: 'CODE_INGRESO', headerCellClass: 'blue'},
								{ field: 'COSTO_TOTAL', headerCellClass: 'blue'},
								{ field: 'FECHA_INGRESO', headerCellClass: 'blue'},
								{ field: 'CREATE_USUARIO', headerCellClass: 'blue'},
								{ field: 'CREATE_TIME', headerCellClass: 'blue'},
								{ field: 'UPDATE_USUARIO', headerCellClass: 'blue'},
								{ field: 'NOMBRE_PROVEEDOR', headerCellClass: 'blue'},
								{ field: 'DESCRIPCION', headerCellClass: 'blue'}];

			$scope.columns[0].displayName = 'Codigo de Ingreso';
			$scope.columns[1].displayName = 'Costo Total';
			$scope.columns[2].displayName = 'Fecha de Ingreso';
			$scope.columns[3].displayName = 'Usuario creador';
			$scope.columns[4].displayName = 'Fecha de creacion';
			$scope.columns[5].displayName = 'Usuario update';
			$scope.columns[6].displayName = 'Proveedor';
			$scope.columns[7].displayName = 'Tipo de documento';
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

			ctrl.detalleIngresoEditData = [];
			ctrl.detalleIngresoEditTable = new NgTableParams({
				page: 1,
				count: 10
			}, {
				data : ctrl.detalleIngresoEditData
			});

			ctrl.modeEditDetalle = false;
			ctrl.switchModeDetalle = function() {
				ctrl.modeEditDetalle = !ctrl.modeEditDetalle;
				$rootScope.toLeft = false;
				ctrl.detalleIngresoData.map(function(detIng) {
					ctrl.detalleIngresoEditData.push(detIng);
					return detIng;
				});
				ctrl.detalleIngresoEditTable.reload();

				var temp = ctrl.detalleIngresoData.reduce(function(list, e) {
					list.push(e.ID_ARTICULO);
					return list;
				}, []);

				var temp2 = ctrl.articuloData.reduce(function(list, e) {
					var index = temp.indexOf(e.ID_ARTICULO);
					if ( index == -1 ) {
						list.push(e);
					} else {
						temp.splice(index,1);
					}
					return list;
				}, []);

				ctrl.articuloData.splice(0, ctrl.articuloData.length);
				temp2.map(function(e){
					ctrl.articuloData.push(e);
				});
				ctrl.articuloTable.reload();

			};

			ctrl.cancelModeDetalle = function() {
				ctrl.modeEditDetalle = false;
				$rootScope.toLeft = true;
				ctrl.callGetArticuloList();
				ctrl.callGetDetalleIngreso(ctrl.idSelectedIngreso);	
				ctrl.detalleIngresoEditData.splice(0, ctrl.detalleIngresoEditData.length);
				ctrl.detalleIngresoEditTable.reload();
			};

			ctrl.idSelectedIngreso = null;
			ctrl.setSelected = function(idSelectedIngreso) {
				if(!ctrl.modeEditDetalle) {
					ctrl.idSelectedIngreso = idSelectedIngreso;
					ctrl.callGetDetalleIngreso(idSelectedIngreso);	
				}
			};

			ctrl.idSelectedArticulo = null;
			ctrl.setSelectedArticulo = function(idSelectedArticulo) {
				ctrl.idSelectedArticulo = idSelectedArticulo;
			};

			ctrl.insertIntoDetalleTable = function(articulo) {
				var index = ctrl.articuloData.indexOf(articulo);
				if (index > -1) {
					ctrl.articuloData.splice(index, 1);
				}
				ctrl.articuloTable.reload();
				ctrl.detalleIngresoEditData.push(articulo);
				ctrl.detalleIngresoEditTable.reload();
			};

			ctrl.validateDetalleIngreso = function() {
				var updated_detalle_ingreso = {
												ID_INGRESO: ctrl.idSelectedIngreso,
												LIST: ctrl.detalleIngresoEditData
											};
				var updated_costo_ingreso = {
												ID_INGRESO: ctrl.idSelectedIngreso,
												COSTO_TOTAL: ctrl.total('Edit')
											};

				IngresoServiceFactory.deleteIngresoDetalle(ctrl.idSelectedIngreso).then(function(){
					IngresoServiceFactory.updateIngresoDetalle(updated_detalle_ingreso);
				}).then(function(){
					IngresoServiceFactory.updateCostoIngreso(updated_costo_ingreso);
				}).then(function() {
					ctrl.backTo();
				});
			};

			ctrl.backTo = function() {
				ctrl.modeEditDetalle = !ctrl.modeEditDetalle;
				$rootScope.toLeft = false;
				ctrl.detalleIngresoEditData.splice(0, ctrl.detalleIngresoEditData.length);
				ctrl.callGetDetalleIngreso(ctrl.idSelectedIngreso);
				ctrl.callGetArticuloList();
				ctrl.callGetAllIngreso();
				ctrl.detalleIngresoTable.reload();
				ctrl.ingresoTable.reload();
			};

			ctrl.checkDetalleIngresoList = function() {
				if (ctrl.detalleIngresoEditData.length === 0) {
					return true;
				} else {
					var res = ctrl.detalleIngresoEditData.reduce(function(acc, element) {
																var test_c = isNullOrUndefined(element.CANTIDAD);
																var test_id = isNullOrUndefined(element.ID_ALMACEN);
																return acc || (test_c || test_id);
															}, false);
					return res;
				}
				
			};

			function isNullOrUndefined(element) {
				return (element === null || element === undefined);
			}

			ctrl.total = function(table) {
				if (table === 'Edit') {
					return ctrl.detalleIngresoEditData.reduce(function(sum, e) {
						if (isNullOrUndefined(e.CANTIDAD)) {
							return sum;
						} else {
							return sum + e.PRECIO_UNITARIO * e.CANTIDAD;
						}
					}, 0);
				} else {
					return ctrl.detalleIngresoData.reduce(function(sum, e) {
																return sum + e.PRECIO_UNITARIO * e.CANTIDAD;
															}, 0);
				}

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