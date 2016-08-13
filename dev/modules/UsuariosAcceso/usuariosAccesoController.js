"use strict";
angular.module('UsuariosAcceso', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
	.controller('usuariosAccesoController', ['$scope',
													'$location',
													'$http',
													'$uibModal',
													'$timeout',
													'UsuariosAccesoServiceFactory',
													'NgTableParams',
													'i18nService',
		function($scope, $location, $http, $uibModal, $timeout, UsuariosAccesoServiceFactory, NgTableParams, i18nService) {
			var ctrl = this;
			ctrl.tableMode = true;
			ctrl.switchTableMode = function() {
				ctrl.tableMode = !ctrl.tableMode;
				console.info("tableMode");
				console.info(ctrl.tableMode);
			};

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: 'DESCRIPCION', headerCellClass: 'blue'}];
			$scope.columns[0].displayName = 'Descripcion';
			$scope.gridOptions = {
				exporterMenuCsv: false,
				enableGridMenu: true,
				enableSorting: true,
				columnDefs: $scope.columns,
				onRegisterApi: function(gridApi) {
					$scope.gridApi = gridApi;
					gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
						$scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
					});
				}
			};

			ctrl.usuariosAccesoData = [{}];
			ctrl.modal_acceso_usuario_not_finished = true;

			ctrl.sortType     = 'ID_ACCESO_USUARIO';
			ctrl.sortReverse  = false;

			ctrl.setType = function(type) {
				ctrl.sortType = type;
				ctrl.sortReverse = !ctrl.sortReverse;
			};

			ctrl.idSelectedAccesoUsuario = null;
			ctrl.setSelected = function(idSelectedAccesoUsuario) {
				ctrl.idSelectedAccesoUsuario = idSelectedAccesoUsuario;
			};

			ctrl.usuariosAccesoTable = new NgTableParams({
			}, {
				getData: function(params) {
					if (ctrl.modal_acceso_usuario_not_finished) {
							ctrl.callGetAllAccesoUsuario();
					} else {
							params.total(ctrl.usuariosAccesoData.AccesosUsuario.length);
							return ctrl.usuariosAccesoData;
					}
					ctrl.modal_acceso_usuario_not_finished = false;
				}
			});

			ctrl.callGetAllAccesoUsuario = function() {
				UsuariosAccesoServiceFactory.getAllAccesoUsuario().then(function(response) {
					$scope.gridOptions.data = response.data.AccesosUsuario;
					ctrl.usuariosAccesoData = response.data;
					ctrl.usuariosAccesoTable.reload();
				});
			};
			ctrl.callGetAllAccesoUsuario();

			

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
					ctrl.callGetAllAccesoUsuario();
					
				}, function() {
					ctrl.callGetAllAccesoUsuario();
				});
			};

		}
]);

	


	
 
