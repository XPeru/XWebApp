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
										'CommonServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams, ArticulosCategoriaServiceFactory, i18nService, CommonServiceFactory) {
		var ctrl = this;
		i18nService.setCurrentLang('es');

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

		CommonServiceFactory.modal(ctrl);
		CommonServiceFactory.switchTableMode(ctrl);
		CommonServiceFactory.setSelected(ctrl, "idSelectedArticulo");

		$scope.columns = [
			CommonServiceFactory.image(),
			CommonServiceFactory.formatColumn('Codigo articulo','CODIGO_ARTICULO','blue','text'),
			CommonServiceFactory.formatColumn('Descripcion','DESCRIPCION','blue','text'),
			CommonServiceFactory.formatColumn('Unidad','UNIDAD','blue','text'),
			CommonServiceFactory.formatColumn('Precio unitario','PRECIO_UNITARIO','blue','number'),
			CommonServiceFactory.formatColumn('Valor de reposicion','VALOR_REPOSICION','blue','number'),
			CommonServiceFactory.formatColumn('Categoria','CATEGORIA','blue','text'),
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
