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
        function($scope, $location, $http, $uibModal, $timeout, TipoPersonaServiceFactory, NgTableParams, i18nService) {
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

            ctrl.tipoPersonaData = [{}];
            ctrl.callGetAllTipoPersona = function() {
                TipoPersonaServiceFactory.getAllTipoPersona().then(function(response) {
                    ctrl.tipoPersonaData = response.data.TipoPersona;
                    $scope.gridOptions.data = response.data.TipoPersona;
                    ctrl.tipoPersonaTable = new NgTableParams({
                        page: 1,
                        count: 10
                    }, {
                        data: ctrl.tipoPersonaData
                    });
                });
            };
            ctrl.callGetAllTipoPersona();

            ctrl.idSelectedTipoPersona = null;
            ctrl.setSelected = function(idSelectedTipoPersona) {
                ctrl.idSelectedTipoPersona = idSelectedTipoPersona;
            };

            ctrl.openModalTipoPersona = function(selected_modal, selectedTipoPersona) {
                var modalInstance = $uibModal.open({
                    templateUrl: function() {
                        var template;
                        switch(selected_modal) {
                            case "create":
                                template = 'dev/modules/TipoPersona/modals/createTipoPersona.html';
                                break;
                            case "edit":
                                template = 'dev/modules/TipoPersona/modals/editTipoPersona.html';
                                break;
                            case "delete":
                                template = 'dev/modules/TipoPersona/modals/deleteTipoPersona.html';
                                break;
                        }
                        return template;
                    },
                    controller: 'modalTipoPersonaController',
                    controllerAs: 'modalTipoPersonaCtrl',
                    resolve : {
                        selectedTipoPersona : function() {
                            return selectedTipoPersona;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    ctrl.callGetAllTipoPersona();
                    ctrl.tipoPersonaTable.reload();
                }, function() {
                    ctrl.callGetAllTipoPersona();
                    ctrl.tipoPersonaTable.reload();
                });
            };
        }
]);