"use strict";
angular.module('UsuariosAcceso', ['ui.bootstrap'])
	.controller('usuariosAccesoController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'UsuariosAccesoServiceFactory',
													'NgTableParams',
		function($scope, $location, $http, $uibModal, $timeout, UsuariosAccesoServiceFactory, NgTableParams) {
			var ctrl = this;
			ctrl.usuariosAccesoData = [{}];
			ctrl.modal_acceso_usuario_not_finished = true;

			ctrl.sortType     = 'ID_ACCESO_USUARIO'; // set the default sort type
			ctrl.sortReverse  = false;  // set the default sort order

			ctrl.setType = function(type) {
				ctrl.sortType = type;
				ctrl.sortReverse = !ctrl.sortReverse;
			};

			ctrl.usuariosAccesoTable = new NgTableParams({
				page: 1,
				count: 10
			}, {
				total: 0,
				counts: [],
				getData: function(params) {
					if (ctrl.modal_acceso_usuario_not_finished) {
							ctrl.callGetAllAccesoUsuario();
						} else {
							params.total(ctrl.usuariosAccesoData.length);
							return ctrl.usuariosAccesoData;
						}
						ctrl.modal_acceso_usuario_not_finished = false;
				}
				
			});

			ctrl.callGetAllAccesoUsuario = function() {
				UsuariosAccesoServiceFactory.getAllAccesoUsuario().then(function(response) {
					ctrl.usuariosAccesoData = response.data;
					ctrl.usuariosAccesoTable.reload();
				});
			};

			ctrl.idSelectedAccesoUsuario = null;
			ctrl.setSelected = function(idSelectedAccesoUsuario) {
				ctrl.idSelectedAccesoUsuario = idSelectedAccesoUsuario;
			};

			ctrl.openModalAccesoUsuario = function(selected_modal, selected_acceso_usuario) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/UsuariosAcceso/modals/createUsuarioAcceso.html';
								break;
							case "edit":
								template = 'dev/modules/UsuariosAcceso/modals/editUsuarioAcceso.html';
								break;
							case "delete":
								template = 'dev/modules/UsuariosAcceso/modals/deleteUsuarioAcceso.html';
								break;
						}
						return template;
					},
					controller: 'modalUsuarioAccesoController',
					controllerAs: 'modalUsuarioAccesoCtrl',
					resolve : {
						selected_acceso_usuario : function() {
							return selected_acceso_usuario;
						}
					}
				});

				modalInstance.result.then(function() {
					ctrl.modal_acceso_usuario_not_finished = true;
					ctrl.usuariosAccesoTable.reload();
					
				}, function() {
					ctrl.modal_acceso_usuario_not_finished = true;
					ctrl.usuariosAccesoTable.reload();
				});
			};

		}
]);

	


	
 
