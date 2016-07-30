"use strict";
angular.module('AlmacenesGestion', ['ui.bootstrap'])
	.controller('almacenesGestionController', ['$scope',
												'$location',
												'$http',
												'$uibModal', 
												'$timeout',
												'AlmacenesGestionServiceFactory',
												'NgTableParams',
		function($scope, $location, $http, $uibModal, $timeout, AlmacenesGestionServiceFactory, NgTableParams) {
			var ctrl = this;
			ctrl.sortType     = 'ID_ALMACEN'; // set the default sort type
			ctrl.sortReverse  = false;  // set the default sort order

			ctrl.setType = function(type) {
				ctrl.sortType = type;
				ctrl.sortReverse = !ctrl.sortReverse;
			};

			ctrl.idSelectedAlmacen = null;
			ctrl.setSelected = function(idSelectedAlmacen) {
				ctrl.idSelectedAlmacen = idSelectedAlmacen;
			};
			ctrl.almacenesData = [{}];
			ctrl.modal_not_finished = true;
			ctrl.almacenesTable = new NgTableParams({
				page: 1,
				count: 10
			}, {
				total: 0,
				counts: [],
				getData: function(params) {
					if (ctrl.modal_not_finished) {
							ctrl.callGetAllAlmacenes();
						} else {
							params.total(ctrl.almacenesData.length);
							return ctrl.almacenesData;
						}
						ctrl.modal_not_finished = false;
				}
			});

				ctrl.callGetAllAlmacenes = function() {
				AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {
							ctrl.almacenesData = response.data;
							ctrl.almacenesTable.reload();
				});
			};

				ctrl.openModal = function(selected_modal, selected_almacen) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/AlmacenesGestion/modals/createAlmacen.html';
								break;
							case "edit":
								template = 'dev/modules/AlmacenesGestion/modals/editAlmacen.html';
								break;
							case "delete":
								template = 'dev/modules/AlmacenesGestion/modals/deleteAlmacen.html';
								break;
						}
						return template;
					},
					controller: 'modalAlmacenController',
					controllerAs: 'modalAlmacenCtrl',
					resolve : {
						selected_almacen : function() {
							return selected_almacen;
						}
					}
				});

				modalInstance.result.then(function() {
						ctrl.modal_not_finished = true;
						ctrl.almacenesTable.reload();
					
				}, function() {
						ctrl.modal_not_finished = true;
						ctrl.almacenesTable.reload();
				});
			};
		}
]);

