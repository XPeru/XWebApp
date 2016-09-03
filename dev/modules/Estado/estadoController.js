"use strict";

angular.module('Estado', ['ui.bootstrap', 'ui.grid','ui.grid.exporter', 'ui.grid.selection'])
    .controller('estadoController', ['$scope',
                                                    '$location',
                                                    '$http',
                                                    '$uibModal',
                                                    '$timeout',
                                                    'EstadoServiceFactory',
                                                    'NgTableParams',
                                                    'i18nService',
        function($scope, $location, $http, $uibModal, $timeout, EstadoServiceFactory, NgTableParams, i18nService) {
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

            ctrl.estadoData = [{}];
            ctrl.callGetAllEstado = function() {
                EstadoServiceFactory.getAllEstado().then(function(response) {
                    ctrl.estadoData = response.data.Estado;
                    $scope.gridOptions.data = response.data.Estado;
                    ctrl.estadoTable = new NgTableParams({
                        page: 1,
                        count: 10
                    }, {
                        data: ctrl.estadoData
                    });
                });
            };
            ctrl.callGetAllEstado();

            ctrl.idSelectedEstado = null;
            ctrl.setSelected = function(idSelectedEstado) {
                ctrl.idSelectedEstado = idSelectedEstado;
            };

            ctrl.openModalEstado = function(selected_modal, selectedEstado) {
                var modalInstance = $uibModal.open({
                    templateUrl: function() {
                        var template;
                        switch(selected_modal) {
                            case "create":
                                template = 'dev/modules/Estado/modals/createEstado.html';
                                break;
                            case "edit":
                                template = 'dev/modules/Estado/modals/editEstado.html';
                                break;
                            case "delete":
                                template = 'dev/modules/Estado/modals/deleteEstado.html';
                                break;
                        }
                        return template;
                    },
                    controller: 'modalEstadoController',
                    controllerAs: 'modalEstadoCtrl',
                    resolve : {
                        selectedEstado : function() {
                            return selectedEstado;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    ctrl.callGetAllEstado();
                    ctrl.estadoTable.reload();
                }, function() {
                    ctrl.callGetAllEstado();
                    ctrl.estadoTable.reload();
                });
            };
        }
]);