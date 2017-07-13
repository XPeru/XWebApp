"use strict";
angular.module('AlmacenesGestion', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('almacenesGestionController', ['$scope',
												'$location',
												'$http',
												'$uibModal',
												'$timeout',
												'AlmacenesGestionServiceFactory',
												'NgTableParams',
												'i18nService',
		function ($scope, $location, $http, $uibModal, $timeout, AlmacenesGestionServiceFactory, NgTableParams, i18nService) {
			var ctrl = this;

			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			ctrl.callGetAllAlmacenes = function() {
				AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {
					ctrl.almacenesData = response.data.Almacenes;
					$scope.gridOptions.data = response.data.Almacenes;
					ctrl.almacenesTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.almacenesData
					});
				});
			};

			ctrl.setSelected = function(idSelectedAlmacen) {
				ctrl.idSelectedAlmacen = idSelectedAlmacen;
			};

			ctrl.openModal = function(selected_modal, selected_almacen) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/AlmacenesGestion/modals/createAlmacen.html';
								break;
							case "edit":
								template = 'dev/modules/AlmacenesGestion/modals/editAlmacen.html';
								break;
							case "delete":
								template = 'dev/modules/AlmacenesGestion/modals/deleteAlmacen.html';
								break;
						}
						return template;
					},
					controller: 'modalAlmacenController',
					controllerAs: 'modalAlmacenCtrl',
					resolve : {
						selected_almacen : function() {
							return selected_almacen;
						}
					}
				});

				modalInstance.result.then(function() {
					ctrl.callGetAllAlmacenes();
					ctrl.almacenesTable.reload();

				}, function() {
					ctrl.callGetAllAlmacenes();
					ctrl.almacenesTable.reload();
				});
			};

			i18nService.setCurrentLang('es');
			ctrl.tableMode = true;
			ctrl.almacenesData = [];
			ctrl.modal_not_finished = true;
			ctrl.idSelectedAlmacen = null;
			ctrl.callGetAllAlmacenes();

			var column0 = {
				displayName: 'Codigo almacen',
				field: 'CODIGO_ALMACEN',
				headerCellClass: 'blue'
			};

			var column1 = {
				displayName: 'Ubicacion',
				field: 'UBICACION',
				headerCellClass: 'blue'
			};
			$scope.columns = [];
			$scope.columns.push(column0);
			$scope.columns.push(column1);

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
