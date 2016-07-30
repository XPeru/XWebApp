"use strict";

angular.module('Articulos', ['ui.bootstrap'])
	.controller('articulosController', ['$scope',
										'$location',
										'$http',
										'$uibModal', 
										'$timeout',
										'ArticulosServiceFactory',
										'NgTableParams',
										'ArticulosCategoriaServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams, ArticulosCategoriaServiceFactory) {
		var ctrl = this;
		ctrl.sortType     = 'ID_ARTICULO'; // set the default sort type
        ctrl.sortReverse  = false;  // set the default sort order

        ctrl.setType = function(type) {
            ctrl.sortType = type;
            ctrl.sortReverse = !ctrl.sortReverse;
        };

        ctrl.idSelectedArticulo = null;
		ctrl.setSelected = function(idSelectedArticulo) {
			ctrl.idSelectedArticulo = idSelectedArticulo;
		};

		ctrl.callGetAllCategorias = function() {
			ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
				ctrl.categoriaList = response.data.Categorias;
			});
		};

		ctrl.callGetAllCategorias();
		ctrl.articlesData = [{}];
		ctrl.modal_article_not_finished = true;
		ctrl.articlesTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if (ctrl.modal_article_not_finished) {
						ctrl.callGetArticuloList();
					} else {
						params.total(ctrl.articlesData.length);
						return ctrl.articlesData;
					}
					ctrl.modal_article_not_finished = false;
			}
			
		});

		ctrl.callGetArticuloList = function() {
			ArticulosServiceFactory.getArticuloList().then(function(response) {
				ctrl.articlesData = response.data;
				ctrl.articlesTable.reload();
			});
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
				ctrl.modal_article_not_finished = true;
				ctrl.articlesTable.reload();
				
			}, function() {
				ctrl.modal_article_not_finished = true;
				ctrl.articlesTable.reload();
			});
		};

	}
]);

