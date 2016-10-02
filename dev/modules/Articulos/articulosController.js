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
		ctrl.tableMode = true;
		ctrl.switchTableMode = function() {
			ctrl.tableMode = !ctrl.tableMode;
		};

		ctrl.callGetAllCategorias = function() {
			ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
				ctrl.categoriaList = response.data.Categorias;
			});
		};
		ctrl.callGetAllCategorias();

		i18nService.setCurrentLang('es');
		$scope.columns = [{ field: 'CODIGO', headerCellClass: 'blue'},
							{field: 'DESCRIPCION', headerCellClass : 'blue'},
							{field: 'UNIDAD', headerCellClass : 'blue'},
							{field: 'PRECIO_UNITARIO', headerCellClass: 'blue'},
							{field: 'VALOR_REPOSICION', headerCellClass :' blue'}];
			$scope.columns[0].displayName = 'Codigo';
			$scope.columns[1].displayName = 'Descripcion';
			$scope.columns[2].displayName = 'Unidad';
			$scope.columns[3].displayName = 'Precio unitario';
			$scope.columns[4].displayName = 'Valor de reposicion';
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

		ctrl.articulosData = [{}];
		ctrl.callGetArticuloList = function() {
			ArticulosServiceFactory.getArticuloList().then(function(response) {
				ctrl.articulosData = response.data.Articulos;
				$scope.gridOptions.data = response.data.Articulos;
				ctrl.articlesTable = new NgTableParams({
					page: 1,
					count: 10
				}, {
					data : ctrl.articulosData
				});
			});
		};
		ctrl.callGetArticuloList();

		ctrl.idSelectedArticulo = null;
		ctrl.setSelected = function(idSelectedArticulo) {
			ctrl.idSelectedArticulo = idSelectedArticulo;
		};

		ctrl.openModalArticulo = function(selected_modal, selected_article) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/Articulos/modals/createArticulo.html';
							break;
						case "edit":
							template = 'dev/modules/Articulos/modals/editArticulo.html';
							break;
						case "delete":
							template = 'dev/modules/Articulos/modals/deleteArticulo.html';
							break;
					}
					return template;
				},
				controller: 'modalArticuloController',
				controllerAs: 'modalArticuloCtrl',
				resolve : {
					selected_article : function() {
						return selected_article;
					},
					categoriaList : function() {
						return ctrl.categoriaList;
					}
				}
			});

			modalInstance.result.then(function() {
				ctrl.callGetArticuloList();
				ctrl.articlesTable.reload();
				
			}, function() {
				ctrl.callGetArticuloList();
				ctrl.articlesTable.reload();
			});
		};

	}
]);

