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
												'CommonServiceFactory',
		function ($scope, $location, $http, $uibModal, $timeout, AlmacenesGestionServiceFactory, NgTableParams, i18nService, CommonServiceFactory) {
			var ctrl = this;
			i18nService.setCurrentLang('es');

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

			CommonServiceFactory.modal(ctrl);
			CommonServiceFactory.switchTableMode(ctrl);
			CommonServiceFactory.setSelected(ctrl, "idSelectedAlmacen");

			ctrl.tableMode = true;
			ctrl.almacenesData = [];
			ctrl.idSelectedAlmacen = null;
			ctrl.callGetAll();

			$scope.columns = [
				CommonServiceFactory.formatColumn('Codigo almacen','CODIGO_ALMACEN', 'blue', 'text'),
				CommonServiceFactory.formatColumn('Ubicacion','UBICACION', 'blue', 'text'),
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
