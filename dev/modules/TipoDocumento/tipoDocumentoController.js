"use strict";

angular.module('TipoDocumento', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
    .controller('tipoDocumentoController', ['$scope',
                                                    '$location',
                                                    '$http',
                                                    '$uibModal',
                                                    '$timeout',
                                                    'TipoDocumentoServiceFactory',
                                                    'NgTableParams',
                                                    'i18nService',
        function($scope, $location, $http, $uibModal, $timeout, TipoDocumentoServiceFactory, NgTableParams, i18nService) {
            var ctrl = this;
            ctrl.tableMode = true;
            ctrl.switchTableMode = function() {
                ctrl.tableMode = !ctrl.tableMode;
            };

            i18nService.setCurrentLang('es');
            $scope.columns = [{ field: 'DESCRIPCION', headerCellClass: 'blue'}];
            $scope.columns[0].displayName = 'Descripcion';
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

            ctrl.tipoDocumentoData = [{}];
            ctrl.callGetAllTipoDocumento = function() {
                TipoDocumentoServiceFactory.getAllTipoDocumento().then(function(response) {
                    ctrl.tipoDocumentoData = response.data.TipoDocumento;
                    $scope.gridOptions.data = response.data.TipoDocumento;
                    ctrl.tipoDocumentoTable = new NgTableParams({
                        page: 1,
                        count: 10
                    }, {
                        data: ctrl.tipoDocumentoData
                    });
                });
            };
            ctrl.callGetAllTipoDocumento();

            ctrl.idSelectedTipoDocumento = null;
            ctrl.setSelected = function(idSelectedTipoDocumento) {
                ctrl.idSelectedTipoDocumento = idSelectedTipoDocumento;
            };

            ctrl.openModalTipoDocumento = function(selected_modal, selectedTipoDocumento) {
                var modalInstance = $uibModal.open({
                    templateUrl: function() {
                        var template;
                        switch(selected_modal) {
                            case "create":
                                template = 'dev/modules/TipoDocumento/modals/createTipoDocumento.html';
                                break;
                            case "edit":
                                template = 'dev/modules/TipoDocumento/modals/editTipoDocumento.html';
                                break;
                            case "delete":
                                template = 'dev/modules/TipoDocumento/modals/deleteTipoDocumento.html';
                                break;
                        }
                        return template;
                    },
                    controller: 'modalTipoDocumentoController',
                    controllerAs: 'modalTipoDocumentoCtrl',
                    resolve : {
                        selectedTipoDocumento : function() {
                            return selectedTipoDocumento;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    ctrl.callGetAllTipoDocumento();
                    ctrl.tipoDocumentoTable.reload();
                }, function() {
                    ctrl.callGetAllTipoDocumento();
                    ctrl.tipoDocumentoTable.reload();
                });
            };
        }
]);