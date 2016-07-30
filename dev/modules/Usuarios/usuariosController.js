"use strict";

angular.module('Usuarios', ['ui.bootstrap'])
	.controller('usuariosController', ['$scope',
										'$location',
										'$http',
										'$uibModal',
										'$timeout',
										'UsuariosServiceFactory',
										'NgTableParams',
										'UsuariosTipoServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, UsuariosServiceFactory, NgTableParams, UsuariosTipoServiceFactory) {
		var ctrl = this;
		ctrl.sortType = 'ID_USUARIO'; // set the default sort type
		ctrl.sortReverse = false; // set the default sort order
		ctrl.setType = function(type) {
			ctrl.sortType = type;
			ctrl.sortReverse = !ctrl.sortReverse;
		};
		ctrl.idSelectedUsuario = null;
		ctrl.setSelected = function(idSelectedUsuario) {
			ctrl.idSelectedUsuario = idSelectedUsuario;
		};

		ctrl.callGetAllTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
				ctrl.tipoUsuarioList = response.data.TiposUsuario;
			});
		};

		ctrl.callGetAllTipoUsuario();
		ctrl.usersData = [{}];
		ctrl.modal_user_not_finished = true;
		ctrl.usersTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if (ctrl.modal_user_not_finished) {
						ctrl.callGetUsuarioList();
					} else {
						params.total(ctrl.usersData.length);
						return ctrl.usersData;
					}
					ctrl.modal_user_not_finished = false;
			}
			
		});

		ctrl.callGetUsuarioList = function() {
			UsuariosServiceFactory.getUsuarioList().then(function(response) {
				ctrl.usersData = response.data;
				ctrl.usersTable.reload();
			});
		};

		ctrl.openModalUsuario = function(selected_modal, selected_user) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/Usuarios/modals/createUsuario.html';
							break;
						case "edit":
							template = 'dev/modules/Usuarios/modals/editUsuario.html';
							break;
						case "delete":
							template = 'dev/modules/Usuarios/modals/deleteUsuario.html';
							break;
					}
					return template;
				},
				controller: 'modalUsuarioController',
				controllerAs: 'modalUsuarioCtrl',
				resolve : {
					selected_user : function() {
						return selected_user;
					},
					tipoUsuarioList : function() {
						return ctrl.tipoUsuarioList;
					}
				}
			});

			modalInstance.result.then(function() {
				ctrl.modal_user_not_finished = true;
				ctrl.usersTable.reload();
				
			}, function() {
				ctrl.modal_user_not_finished = true;
				ctrl.usersTable.reload();
			});
		};

	}
]);