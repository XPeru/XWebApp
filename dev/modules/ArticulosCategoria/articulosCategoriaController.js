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
			ctrl.tableMode = true;
			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: 'DESCRIPCION', headerCellClass: 'blue'}];
			$scope.columns[0].displayName = 'Descripcion';
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

			ctrl.categoriasData = [{}];
			ctrl.callGetAllCategorias = function() {
				ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
					ctrl.categoriasData = response.data.Categorias;
					$scope.gridOptions.data = response.data.Categorias;
					ctrl.categoriasTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.categoriasData
					});
				});
			};
			ctrl.callGetAllCategorias();

			ctrl.idSelectedCategoria = null;
			ctrl.setSelected = function(idSelectedCategoria) {
				ctrl.idSelectedCategoria = idSelectedCategoria;
			};

			ctrl.openModalArticuloCategoria = function(selected_modal, selected_categoria) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/ArticulosCategoria/modals/createCategoria.html';
								break;
							case "edit":
								template = 'dev/modules/ArticulosCategoria/modals/editCategoria.html';
								break;
							case "delete":
								template = 'dev/modules/ArticulosCategoria/modals/deleteCategoria.html';
								break;
						}
						return template;
					},
					controller: 'modalCategoriaController',
					controllerAs: 'modalCategoriaCtrl',
					resolve : {
						selected_categoria : function() {
							return selected_categoria;
						}
					}
				});

				modalInstance.result.then(function() {
					ctrl.callGetAllCategorias();
					ctrl.categoriasTable.reload();
				}, function() {
					ctrl.callGetAllCategorias();
					ctrl.categoriasTable.reload();
				});
			};
		}
]);