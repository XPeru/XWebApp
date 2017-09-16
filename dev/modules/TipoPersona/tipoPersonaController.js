"use strict";

angular.module('TipoPersona', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
    .controller('tipoPersonaController', ['$scope',
										'$location',
										'$http',
										'$uibModal',
										'$timeout',
										'TipoPersonaServiceFactory',
										'NgTableParams',
										'i18nService',
										'CommonServiceFactory',
		function($scope, $location, $http, $uibModal, $timeout, TipoPersonaServiceFactory, NgTableParams, i18nService, CommonServiceFactory) {
			var ctrl = this;
			i18nService.setCurrentLang('es');

			ctrl.callGetAll = function() {
				TipoPersonaServiceFactory.getAllTipoPersona().then(function(response) {
					ctrl.tipoPersonaData = response.data.TipoPersona;
					$scope.gridOptions.data = response.data.TipoPersona;
					ctrl.table = new NgTableParams({
						page: 1,
						count: 10
					}, {
						data: ctrl.tipoPersonaData
					});
				});
			};

			ctrl.modal = {
				url: {
					create : 'dev/modules/TipoPersona/modals/createTipoPersona.html',
					edit: 'dev/modules/TipoPersona/modals/editTipoPersona.html',
					delete: 'dev/modules/TipoPersona/modals/deleteTipoPersona.html'
				},
				controller: 'modalTipoPersonaController',
				controllerAs: 'modalTipoPersonaCtrl',
				id: 'ID_TIPO_PERSONA',
				ctrlParent: ctrl
			};

			CommonServiceFactory.modal(ctrl);
			CommonServiceFactory.switchTableMode(ctrl);
			CommonServiceFactory.setSelected(ctrl, "idSelectedTipoPersona");

			ctrl.tableMode = true;
			ctrl.tipoPersonaData = [];
			ctrl.idSelectedTipoPersona = null;
			ctrl.callGetAll();

			$scope.columns = [
				CommonServiceFactory.formatColumn('Descripcion','DESCRIPCION', 'blue', 'text'),
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
