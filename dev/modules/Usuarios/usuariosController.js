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
										'CommonServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, UsuariosServiceFactory, NgTableParams, UsuariosTipoServiceFactory, i18nService, CommonServiceFactory) {
		var ctrl = this;
		i18nService.setCurrentLang('es');

		ctrl.callGetAll = function() {
			UsuariosServiceFactory.getUsuarioList().then(function(response) {
				ctrl.usersData = response.data.Usuarios;
				$scope.gridOptions.data = response.data.Usuarios;
				ctrl.table = new NgTableParams({
					page: 1,
					count: 10
				}, {
					data : ctrl.usersData
				});
			});
		};

		ctrl.callGetAllTipoUsuario = function() {
			UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
				ctrl.tipoUsuarioList = response.data.TiposUsuario;
			});
		};

		ctrl.modal = {
			url: {
				create : 'dev/modules/Usuarios/modals/createUsuario.html',
				edit: 'dev/modules/Usuarios/modals/editUsuario.html',
				delete: 'dev/modules/Usuarios/modals/deleteUsuario.html'
			},
			controller: 'modalUsuarioController',
			controllerAs: 'modalUsuarioCtrl',
			id: 'ID_USUARIO',
			ctrlParent: ctrl
		};

		CommonServiceFactory.modal(ctrl);
		CommonServiceFactory.switchTableMode(ctrl);
		CommonServiceFactory.setSelected(ctrl, "idSelectedUsuario");

		ctrl.tableMode = true;
		ctrl.usersData = [];
		ctrl.idSelectedUsuario = null;
		ctrl.callGetAll();
		ctrl.callGetAllTipoUsuario();

		$scope.columns = [
			CommonServiceFactory.foto(),
			CommonServiceFactory.formatColumn('Nombre','NOMBRE','blue','text'),
			CommonServiceFactory.formatColumn('Apellidos','APELLIDOS','blue','text'),
			CommonServiceFactory.formatColumn('Email','EMAIL','blue','text'),
			CommonServiceFactory.formatColumn('Fecha de Creacion','CREATE_TIME','blue','text'),
			CommonServiceFactory.formatColumn('Ultima Modificacion','UPDATE_TIME','blue','text'),
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

	}
]);
