"use strict";

angular.module('Articulos', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('articulosController', ['$scope',
										'$location',
										'$http',
										'$uibModal',
										'$timeout',
										'ArticulosServiceFactory',
										'NgTableParams',
										'ArticulosCategoriaServiceFactory',
										'i18nService',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams, ArticulosCategoriaServiceFactory, i18nService) {
		var ctrl = this;
		i18nService.setCurrentLang('es');

		ctrl.switchTableMode = function() {
			ctrl.tableMode = !ctrl.tableMode;
		};

		ctrl.setSelected = function(idSelectedArticulo) {
			ctrl.idSelectedArticulo = idSelectedArticulo;
		};

		ctrl.callGetAllCategorias = function() {
			ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
				ctrl.categoriaList = response.data.Categorias;
			});
		};

		ctrl.callGetAll = function() {
			ArticulosServiceFactory.getArticuloList().then(function(response) {
				ctrl.articulosData = response.data.Articulos;
				$scope.gridOptions.data = response.data.Articulos;
				ctrl.table = new NgTableParams({
					page: 1,
					count: 10
				}, {
					data : ctrl.articulosData
				});
			});
		};

		ctrl.articulosData = [];
		ctrl.idSelectedArticulo = null;
		ctrl.tableMode = true;
		ctrl.callGetAll();
		ctrl.callGetAllCategorias();

		ctrl.modal = {
			url: {
				create : 'dev/modules/Articulos/modals/createArticulo.html',
				edit: 'dev/modules/Articulos/modals/editArticulo.html',
				delete: 'dev/modules/Articulos/modals/deleteArticulo.html'
			},
			controller: 'modalArticuloController',
			controllerAs: 'modalArticuloCtrl',
			id: 'ID_ARTICULO',
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

		$scope.columns = [];

		$scope.columns[0] = {
			displayName: 'Codigo articulo',
			field: 'CODIGO_ARTICULO',
			headerCellClass: 'blue'
		};

		$scope.columns[1] = {
			displayName: 'Descripcion',
			field: 'DESCRIPCION',
			headerCellClass: 'blue'
		};

		$scope.columns[2] = {
			displayName: 'Unidad',
			field: 'UNIDAD',
			headerCellClass: 'blue'
		};

		$scope.columns[3] = {
			displayName: 'Precio unitario',
			field: 'PRECIO_UNITARIO',
			headerCellClass: 'blue'
		};

		$scope.columns[4] = {
			displayName: 'Valor de reposicion',
			field: 'VALOR_REPOSICION',
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
