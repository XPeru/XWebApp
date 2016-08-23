"use strict";
angular.module('UsuariosTipo')
	.controller('modalAssoTipoAccesoController',
		function ($scope, $http, $timeout, $uibModalInstance, selectedTipoUsuario, selectedAssos, allAssos, UsuariosTipoServiceFactory, i18nService) {
			var ctrl = this;
			ctrl.selectedTipoUsuario = selectedTipoUsuario;
			ctrl.selectedAssos = selectedAssos;
			ctrl.allAssos = allAssos;

			i18nService.setCurrentLang('es');
			$scope.columns = [{ field: 'DESCRIPCION', headerCellClass: 'blue'}];
			$scope.columns[0].displayName = 'Acceso';
			$scope.gridOptions = {
				// exporterMenuCsv: false,
				// enableGridMenu: false,
				enableRowSelection: true,
    			enableSelectAll: true,
				enableSorting: true,
				enableFiltering: false,
				showGridFooter:true,
				columnDefs: $scope.columns,
				data: ctrl.allAssos,
				onRegisterApi: function(gridApi) {
					$scope.gridApi = gridApi;
				}
			};

			function isSelected(row, objArray) {
				for (var i = 0; i < objArray.length; i++) {
					if (objArray[i].ID_ACCESO_USUARIO === row.ID_ACCESO_USUARIO) {
						return true;
					}
				}
			  	return false;
			}
			$timeout(function() {
		        $scope.gridOptions.data.forEach(function (row, index) {
				    if (isSelected(row, ctrl.selectedAssos)) {
				        $scope.gridApi.selection.selectRow($scope.gridOptions.data[index]);
				    }
				});
		    });

			ctrl.updateAsso = function () {
				ctrl.selectedAssos = $scope.gridApi.selection.getSelectedRows();
				var req_json = { ID_TIPO_USUARIO: selectedTipoUsuario.ID_TIPO_USUARIO, LIST: ctrl.selectedAssos};
				UsuariosTipoServiceFactory.deleteAssosTipoAcceso(selectedTipoUsuario.ID_TIPO_USUARIO).then(function(){
					UsuariosTipoServiceFactory.updateAssosTipoAcceso(req_json);
				}).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
);