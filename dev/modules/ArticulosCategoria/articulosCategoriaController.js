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
		function($scope, $location, $http, $uibModal, $timeout, ArticulosCategoriaServiceFactory, NgTableParams, i18nService) {
			var ctrl = this;
			i18nService.setCurrentLang('es');


			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			ctrl.setSelected = function(idSelectedCategoria) {
				ctrl.idSelectedCategoria = idSelectedCategoria;
			};

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

			$scope.columns = [
				{
					field: 'DESCRIPCION',
					headerCellClass: 'blue',
					displayName: 'Descripcion'
				}
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
