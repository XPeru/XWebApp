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
			i18nService.setCurrentLang('es');

			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			ctrl.callGetAll = function() {
				AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {
					ctrl.almacenesData = response.data.Almacenes;
					$scope.gridOptions.data = response.data.Almacenes;
					ctrl.table = new NgTableParams({
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

			ctrl.labels = [
				{
					title:	 	"CODIGO_ALMACEN",
					filter:		{
						CODIGO_ALMACEN: 'text'
					}
				},
				{
					title:	 	"UBICACION",
					filter:		{
						UBICACION: 'text'
					}
				}
			];

			ctrl.modal = {
				url: {
					create : 'dev/modules/AlmacenesGestion/modals/createAlmacen.html',
					edit: 'dev/modules/AlmacenesGestion/modals/editAlmacen.html',
					delete: 'dev/modules/AlmacenesGestion/modals/deleteAlmacen.html'
				},
				controller: 'modalAlmacenController',
				controllerAs: 'modalAlmacenCtrl',
				id: 'ID_ALMACEN',
				ctrlParent: ctrl
			};

			ctrl.modalCreate = Object.assign({}, ctrl.modal, {
				mode: 'create',
				buttonClass: 'pull-right btn btn-small btn-success btn_separate',
				iconClass: 'glyphicon glyphicon-plus',
				text: 'Nuevo '
			});

			ctrl.modalEdit = Object.assign({}, ctrl.modal, {
				mode: 'edit',
				buttonClass: 'btn btn-small btn-primary',
				iconClass: 'glyphicon glyphicon-pencil'
			});

			ctrl.modalDelete = Object.assign({}, ctrl.modal, {
				mode: 'delete',
				buttonClass: 'btn btn-small btn-danger',
				iconClass: 'glyphicon glyphicon-remove'
			});

			ctrl.tableMode = true;
			ctrl.almacenesData = [];
			ctrl.modal_not_finished = true;
			ctrl.idSelectedAlmacen = null;
			ctrl.callGetAll();

			$scope.columns = [];
			$scope.columns[0] = {
				displayName: 'Codigo almacen',
				field: 'CODIGO_ALMACEN',
				headerCellClass: 'blue'
			};

			$scope.columns[1] = {
				displayName: 'Ubicacion',
				field: 'UBICACION',
				headerCellClass: 'blue'
			};

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
