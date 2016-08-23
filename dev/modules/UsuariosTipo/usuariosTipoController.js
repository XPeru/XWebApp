"use strict";

angular.module('UsuariosTipo', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('usuariosTipoController', ['$scope',
													'$window',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'UsuariosTipoServiceFactory',
													'NgTableParams',
													'i18nService',
													'UsuariosAccesoServiceFactory',
	function ($scope, $window, $location, $http, $uibModal, $timeout, UsuariosTipoServiceFactory, NgTableParams, i18nService, UsuariosAccesoServiceFactory) {
		var ctrl = this;
		ctrl.tableMode = true;
		ctrl.switchTableMode = function() {
			ctrl.tableMode = !ctrl.tableMode;
		};
		i18nService.setCurrentLang('es');
		$scope.columns = [{ field: 'TIPO', headerCellClass: 'blue'}];
		$scope.columns[0].displayName = 'Tipo';
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

		ctrl.usuariosTipoData = [{}];
		ctrl.callGetAllTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
				ctrl.usuariosTipoData = response.data.TiposUsuario;
				$scope.gridOptions.data = response.data.TiposUsuario;
				ctrl.usuariosTipoTable = new NgTableParams({
					page: 1,
					count: 10
				}, {
					total: 0,
					data : ctrl.usuariosTipoData
					
				});
			});
		};
		ctrl.callGetAllTipoUsuario();

		ctrl.idSelectedTipoUsuario = null;
		ctrl.setSelected = function(selectedTipoUsuario) {
			ctrl.idSelectedTipoUsuario = selectedTipoUsuario.ID_TIPO_USUARIO;
			ctrl.selectedTipoUsuario = selectedTipoUsuario;
			ctrl.callGetAssosTipoAccesosByIdTipoUsuario();
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
				ctrl.callGetAllTipoUsuario();
				ctrl.usuariosTipoTable.reload();
				
			}, function() {
				ctrl.callGetAllTipoUsuario();
				ctrl.usuariosTipoTable.reload();
			});
		};


		ctrl.assoTipoAccesoData = [{}];
		ctrl.callGetAssosTipoAccesosByIdTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAssosTipoAccesosByIdTipoUsuario(ctrl.idSelectedTipoUsuario).then(function(response) {
				ctrl.assoTipoAccesoData = response.data.Assos;
				ctrl.assoTipoAccesoTable = new NgTableParams({
					page: 1,
					count: 10
				}, {
					total: 0,
					data : ctrl.assoTipoAccesoData
				});
			});
		};

		ctrl.usuariosAccesoData = [{}];
		ctrl.callGetAllAccesoUsuario = function() {
				UsuariosAccesoServiceFactory.getAllAccesoUsuario().then(function(response) {
					ctrl.usuariosAccesoData = response.data.AccesosUsuario;
				});
			};

		ctrl.callGetAllAccesoUsuario();

		ctrl.openModalAssoTipoAcceso = function() {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					return 'dev/modules/UsuariosTipo/modals/editAssoTipoAcceso.html';
					
				},
				controller: 'modalAssoTipoAccesoController',
				controllerAs: 'modalAssoTipoAccesoCtrl',
				resolve : {
					selectedAssos : function() {
						return ctrl.assoTipoAccesoData;
					},
					allAssos : function() {
						return ctrl.usuariosAccesoData;
					},
					selectedTipoUsuario : function() {
						return ctrl.selectedTipoUsuario;
					}
				}
			});

			modalInstance.result.then(function() {
				ctrl.callGetAssosTipoAccesosByIdTipoUsuario();
				ctrl.assoTipoAccesoTable.reload();
				
			}, function() {
				ctrl.callGetAssosTipoAccesosByIdTipoUsuario();
				ctrl.assoTipoAccesoTable.reload();
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