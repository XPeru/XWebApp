"use strict";

angular.module('ArticulosCategoria', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('articulosCategoriaController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'ArticulosCategoriaServiceFactory',
													'NgTableParams',
													'i18nService',
													'CommonServiceFactory',
		function($scope, $location, $http, $uibModal, $timeout, ArticulosCategoriaServiceFactory, NgTableParams, i18nService, CommonServiceFactory) {
			var ctrl = this;
			i18nService.setCurrentLang('es');

			ctrl.callGetAll = function() {
				ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
					ctrl.categoriasData = response.data.Categorias;
					$scope.gridOptions.data = response.data.Categorias;
					ctrl.table = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.categoriasData
					});
				});
			};
			ctrl.callGetAll();
			ctrl.tableMode = true;
			ctrl.idSelectedCategoria = null;
			ctrl.categoriasData = [];

			ctrl.modal = {
				url: {
					create : 'dev/modules/ArticulosCategoria/modals/createCategoria.html',
					edit: 'dev/modules/ArticulosCategoria/modals/editCategoria.html',
					delete: 'dev/modules/ArticulosCategoria/modals/deleteCategoria.html'
				},
				controller: 'modalCategoriaController',
				controllerAs: 'modalCategoriaCtrl',
				id: 'ID_CATEGORIA',
				ctrlParent: ctrl
			};

			CommonServiceFactory.modal(ctrl);
			CommonServiceFactory.switchTableMode(ctrl);
			CommonServiceFactory.setSelected(ctrl, "idSelectedCategoria");

			$scope.columns = [
				CommonServiceFactory.formatColumn('Descripcion','DESCRIPCION','blue','text'),
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
