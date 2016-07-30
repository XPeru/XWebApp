"use strict";

angular.module('UsuariosTipo', ['ui.bootstrap'])
	.controller('usuariosTipoController', ['$scope',
													'$window',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'UsuariosTipoServiceFactory',
													'NgTableParams',
	function ($scope, $window, $location, $http, $uibModal, $timeout, UsuariosTipoServiceFactory, NgTableParams) {
		var ctrl = this;
		ctrl.sortType     = 'ID_TIPO_USUARIO'; // set the default sort type
		ctrl.sortReverse  = false;  // set the default sort order

		ctrl.setType = function(type) {
			ctrl.sortType = type;
			ctrl.sortReverse = !ctrl.sortReverse;
		};
		ctrl.usuariosTipoData = [{}];
		ctrl.modal_tipo_usuario_not_finished = true;
		ctrl.usuariosTipoTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if (ctrl.modal_tipo_usuario_not_finished) {
						ctrl.callGetAllTipoUsuario();
					} else {
						params.total(ctrl.usuariosTipoData.length);
						return ctrl.usuariosTipoData;
					}
					ctrl.modal_tipo_usuario_not_finished = false;
			}
			
		});

		ctrl.callGetAllTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
				ctrl.usuariosTipoData = response.data;
				ctrl.usuariosTipoTable.reload();
			});
		};

		ctrl.idSelectedTipoUsuario = null;
		ctrl.setSelected = function(idSelectedTipoUsuario) {
			ctrl.idSelectedTipoUsuario = idSelectedTipoUsuario;
		};

		ctrl.openModalTipoUsuario = function(selected_modal, selected_tipo_usuario) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/UsuariosTipo/modals/createUsuarioTipo.html';
							break;
						case "edit":
							template = 'dev/modules/UsuariosTipo/modals/editUsuarioTipo.html';
							break;
						case "delete":
							template = 'dev/modules/UsuariosTipo/modals/deleteUsuarioTipo.html';
							break;
					}
					return template;
				},
				controller: 'modalUsuarioTipoController',
				controllerAs: 'modalUsuarioTipoCtrl',
				resolve : {
					selected_tipo_usuario : function() {
						return selected_tipo_usuario;
					}
				}
			});

			modalInstance.result.then(function() {
				ctrl.modal_tipo_usuario_not_finished = true;
				ctrl.usuariosTipoTable.reload();
				
			}, function() {
				ctrl.usuariosTipoTable.reload();
			});
		};


		ctrl.assoTipoAccesoData = [{}];
		ctrl.modal_asso_tipo_acceso_not_finished = true;
		ctrl.assoTipoAccesoTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if (ctrl.modal_asso_tipo_acceso_not_finished) {
						ctrl.callGetAssosTipoAccesos();
					} else {
						params.total(ctrl.assoTipoAccesoData.length);
						return ctrl.assoTipoAccesoData;
					}
					ctrl.modal_asso_tipo_acceso_not_finished = false;
			}
			
		});

		ctrl.callGetAssosTipoAccesosByIdTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAssosTipoAccesosByIdTipoUsuario(ctrl.idSelectedTipoUsuario).then(function(response) {
				ctrl.assoTipoAccesoData = response.data;
				ctrl.assoTipoAccesoTable.reload();
			});
		};

		ctrl.openModalAssoTipoAcceso = function() {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					return 'dev/modules/UsuariosTipo/modals/editAssoTipoAcceso.html';
					
				},
				controller: 'modalAssoTipoAccesoController',
				controllerAs: 'modalAssoTipoAccesoCtrl',
				resolve : {
					selected_tipo_usuario : function() {
						return ctrl.idSelectedTipoUsuario;
					}
				}
			});

			modalInstance.result.then(function() {
				ctrl.modal_asso_tipo_acceso_not_finished = true;
				ctrl.assoTipoAccesoTable.reload();
				
			}, function() {
				ctrl.modal_asso_tipo_acceso_not_finished = true;
			});
		};

		ctrl.watchPDF = function() {
			UsuariosTipoServiceFactory.getPDF(function(response) {
					$timeout(function() {
						$window.open(response.dataR);
					}, 200);
			});
			// $window.open("aaa.pdf");
		};
	}
]);