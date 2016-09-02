"use strict";

angular.module('Cliente', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('clienteController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'ClienteServiceFactory',
													'NgTableParams',
													'i18nService',
													'TipoPersonaServiceFactory',
		function($scope, $location, $http, $uibModal, $timeout, ClienteServiceFactory, NgTableParams, i18nService, TipoPersonaServiceFactory) {
			var ctrl = this;
			ctrl.tableMode = true;
			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
			};

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: '', headerCellClass: 'blue'}];
			$scope.columns[0].displayName = '';
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

			ctrl.clienteData = [{}];
			ctrl.callGetAllCliente = function() {
				ClienteServiceFactory.getAllCliente().then(function(response) {
					ctrl.clienteData = response.data.Persona;
					$scope.gridOptions.data = response.data.Persona;
					ctrl.clienteTable = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.clienteData
					});
				});
			};
			ctrl.callGetAllCliente();

			ctrl.idSelectedCliente = null;
			ctrl.setSelected = function(idSelectedCliente) {
				ctrl.idSelectedCliente = idSelectedCliente;
			};

			ctrl.callGetTipoPersonaByDesc = function() {
				TipoPersonaServiceFactory.getTipoPersonaByDesc('Cliente').then(function(response) {
					ctrl.tipoPersona = response.data.TipoPersona;
				});
			};
			ctrl.callGetTipoPersonaByDesc();

			ctrl.openModalCliente = function(selected_modal, selectedCliente) {
				var modalInstance = $uibModal.open({
					templateUrl: function() {
						var template;
						switch(selected_modal) {
							case "create":
								template = 'dev/modules/Cliente/modals/createCliente.html';
								break;
							case "edit":
								template = 'dev/modules/Cliente/modals/editCliente.html';
								break;
							case "delete":
								template = 'dev/modules/Cliente/modals/deleteCliente.html';
								break;
						}
						return template;
					},
					controller: 'modalClienteController',
					controllerAs: 'modalClienteCtrl',
					resolve : {
						selectedCliente : function() {
							return selectedCliente;
						},

						tipoPersona: function() {
							return ctrl.tipoPersona;
						}
					}
				});

				modalInstance.result.then(function() {
					ctrl.callGetAllCliente();
					ctrl.clienteTable.reload();
				}, function() {
					ctrl.callGetAllCliente();
					ctrl.clienteTable.reload();
				});
			};
		}
]);
