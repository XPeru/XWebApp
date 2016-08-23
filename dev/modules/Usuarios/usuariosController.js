"use strict";

angular.module('Usuarios', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('usuariosController', ['$scope',
										'$location',
										'$http',
										'$uibModal',
										'$timeout',
										'UsuariosServiceFactory',
										'NgTableParams',
										'UsuariosTipoServiceFactory',
										'i18nService',
	function($scope, $location, $http, $uibModal, $timeout, UsuariosServiceFactory, NgTableParams, UsuariosTipoServiceFactory, i18nService) {
		var ctrl = this;
		ctrl.tableMode = true;
		ctrl.switchTableMode = function() {
			ctrl.tableMode = !ctrl.tableMode;
		};

		ctrl.callGetAllTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
				ctrl.tipoUsuarioList = response.data.TiposUsuario;
			});
		};
		ctrl.callGetAllTipoUsuario();

		i18nService.setCurrentLang('es');
		$scope.columns = [{ field: 'NOMBRE', headerCellClass: 'blue'},
							{field: 'APELLIDOS', headerCellClass : 'blue'},
							{field: 'EMAIL', headerCellClass : 'blue'},
							{field: 'CREATE_TIME', headerCellClass: 'blue'},
							{field: 'UPDATE_TIME', headerCellClass :' blue'}];
			$scope.columns[0].displayName = 'Nombre';
			$scope.columns[1].displayName = 'Apellidos';
			$scope.columns[2].displayName = 'Email';
			$scope.columns[3].displayName = 'Fecha de Creacion';
			$scope.columns[4].displayName = 'Ultima Modificacion';
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

		ctrl.usersData = [{}];
		ctrl.callGetUsuarioList = function() {
			UsuariosServiceFactory.getUsuarioList().then(function(response) {
				ctrl.usersData = response.data.Usuarios;
				$scope.gridOptions.data = response.data.Usuarios;
				ctrl.usersTable = new NgTableParams({
					page: 1,
					count: 10
				}, {
					data : ctrl.usersData
				});
			});
		};
		ctrl.callGetUsuarioList();

		ctrl.idSelectedUsuario = null;
		ctrl.setSelected = function(idSelectedUsuario) {
			ctrl.idSelectedUsuario = idSelectedUsuario;
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
				ctrl.callGetUsuarioList();
				ctrl.usersTable.reload();
				
			}, function() {
				ctrl.callGetUsuarioList();
				ctrl.usersTable.reload();
			});
		};

	}
]);