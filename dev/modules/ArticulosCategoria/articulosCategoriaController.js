"use strict";

angular.module('ArticulosCategoria', ['ui.bootstrap'])
	.controller('articulosCategoriaController', ['$scope',
												'$location',
												'$http',
												'$uibModal',
												'$timeout',
												'ArticulosCategoriaServiceFactory',
												'NgTableParams',
		function($scope, $location, $http, $uibModal, $timeout, ArticulosCategoriaServiceFactory, NgTableParams) {
			var ctrl = this;
			ctrl.sortType     = 'ID_CATEGORIA'; // set the default sort type
			ctrl.sortReverse = false; // set the default sort order
			ctrl.setType = function(type) {
				ctrl.sortType = type;
				ctrl.sortReverse = !ctrl.sortReverse;
			};

			ctrl.idSelectedCategoria = null;
			ctrl.setSelected = function(idSelectedCategoria) {
				ctrl.idSelectedCategoria = idSelectedCategoria;
			};
			ctrl.categoriasData = [{}];
			ctrl.modal_not_finished = true;
			ctrl.categoriasTable = new NgTableParams({
				page: 1,
				count: 10
			}, {
				total: 0,
				counts: [],
				getData: function(params) {
					if (ctrl.modal_not_finished) {
							ctrl.callGetAllCategorias();
						} else {
							params.total(ctrl.categoriasData.length);
							return ctrl.categoriasData;
						}
						ctrl.modal_not_finished = false;
				}
			});

			ctrl.callGetAllCategorias = function() {
				ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
					ctrl.categoriasData = response.data;
					ctrl.categoriasTable.reload();
				});
			};

			ctrl.openModal = function(selected_modal, selected_categoria) {
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
					ctrl.modal_not_finished = true;
					ctrl.categoriasTable.reload();
				}, function() {
					ctrl.modal_not_finished = true;
					ctrl.categoriasTable.reload();
				});
			};
		}
]);