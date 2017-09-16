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
											'CommonServiceFactory',
	function ($scope, $window, $location, $http, $uibModal, $timeout, UsuariosTipoServiceFactory, NgTableParams, i18nService, UsuariosAccesoServiceFactory, CommonServiceFactory) {
		var ctrl = this;
		i18nService.setCurrentLang('es');
		ctrl.tableMode = true;
		ctrl.showAccesos = false;
		CommonServiceFactory.switchTableMode(ctrl);

		ctrl.callGetAll = function () {
			UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
				ctrl.usuariosTipoData = response.data.TiposUsuario;
				$scope.gridOptions.data = response.data.TiposUsuario;
				ctrl.table = new NgTableParams({
					page: 1,
					count: 10
				}, {
					total: 0,
					data : ctrl.usuariosTipoData
				});
			});
		};

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

		$scope.columns = [
			CommonServiceFactory.formatColumn('Tipo','TIPO', 'blue', 'text'),
			CommonServiceFactory.buttons()
		];

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

		ctrl.usuariosTipoData = [];

		ctrl.callGetAll();

		ctrl.idSelectedTipoUsuario = null;
		ctrl.setSelected = function(selectedTipoUsuario) {
			ctrl.idSelectedTipoUsuario = selectedTipoUsuario.ID_TIPO_USUARIO;
			ctrl.selectedTipoUsuario = selectedTipoUsuario;
			ctrl.showAccesos = true;
			ctrl.callGetAssosTipoAccesosByIdTipoUsuario();
		};

		ctrl.modal = {
			url: {
				create : 'dev/modules/UsuariosTipo/modals/createUsuarioTipo.html',
				edit: 'dev/modules/UsuariosTipo/modals/editUsuarioTipo.html',
				delete: 'dev/modules/UsuariosTipo/modals/deleteUsuarioTipo.html'
			},
			controller: 'modalUsuarioTipoController',
			controllerAs: 'modalUsuarioTipoCtrl',
			id: 'ID_TIPO_USUARIO',
			ctrlParent: ctrl
		};
		CommonServiceFactory.modal(ctrl);
		ctrl.assoTipoAccesoData = [{}];


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
