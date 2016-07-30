var usuariosTipo = angular.module('UsuariosTipo', ['ui.bootstrap']);
usuariosTipo.controller('usuariosTipoController', ['$scope',
                                                    '$window',
                                                    '$location',
                                                    '$http',
                                                    '$uibModal',
                                                    '$timeout',
                                                    'UsuariosTipoServiceFactory',
                                                    'NgTableParams',
    function ($scope, $window, $location, $http, $uibModal, $timeout, UsuariosTipoServiceFactory, NgTableParams) {
        $scope.sortType     = 'ID_TIPO_USUARIO'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        $scope.setType = function(type) {
            $scope.sortType = type;
            $scope.sortReverse = !$scope.sortReverse;
        };
        $scope.usuariosTipoData = [{}];
        $scope.modal_tipo_usuario_not_finished = true;
        $scope.usuariosTipoTable = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: 0,
            counts: [],
            getData: function(params) {
                if ($scope.modal_tipo_usuario_not_finished) {
                        $scope.callGetAllTipoUsuario();
                    } else {
                        params.total($scope.usuariosTipoData.length);
                        return $scope.usuariosTipoData;
                    }
                    $scope.modal_tipo_usuario_not_finished = false;
            }
            
        });

        $scope.callGetAllTipoUsuario = function() {
            UsuariosTipoServiceFactory.getAllTipoUsuario().then(function(response) {
                $scope.usuariosTipoData = response.data;
                $scope.usuariosTipoTable.reload();
            });
        };

        $scope.idSelectedTipoUsuario = null;
        $scope.setSelected = function(idSelectedTipoUsuario) {
            $scope.idSelectedTipoUsuario = idSelectedTipoUsuario;
        };

        $scope.openModalTipoUsuario = function(selected_modal, selected_tipo_usuario) {
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
                controller: 'ModalUsuarioTipoController',
                resolve : {
                    selected_tipo_usuario : function() {
                        return selected_tipo_usuario;
                    }
                }
            });

            modalInstance.result.then(function() {
                $scope.modal_tipo_usuario_not_finished = true;
                $scope.usuariosTipoTable.reload();
                
            }, function() {
                $scope.modal_tipo_usuario_not_finished = true;
            });
        };


        $scope.assoTipoAccesoData = [{}];
        $scope.modal_asso_tipo_acceso_not_finished = true;
        $scope.assoTipoAccesoTable = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: 0,
            counts: [],
            getData: function(params) {
                if ($scope.modal_asso_tipo_acceso_not_finished) {
                        $scope.callGetAssosTipoAccesos();
                    } else {
                        params.total($scope.assoTipoAccesoData.length);
                        return $scope.assoTipoAccesoData;
                    }
                    $scope.modal_asso_tipo_acceso_not_finished = false;
            }
            
        });

        $scope.callGetAssosTipoAccesosByIdTipoUsuario = function() {
            UsuariosTipoServiceFactory.getAssosTipoAccesosByIdTipoUsuario($scope.idSelectedTipoUsuario).then(function(response) {
                $scope.assoTipoAccesoData = response;
                $scope.assoTipoAccesoTable.reload();
            });
        };

        $scope.openModalAssoTipoAcceso = function() {
            var modalInstance = $uibModal.open({
                templateUrl: function() {
                    return 'dev/modules/UsuariosTipo/modals/editAssoTipoAcceso.html';
                    
                },
                controller: 'ModalAssoTipoAccesoController',
                resolve : {
                    selected_tipo_usuario : function() {
                        return $scope.idSelectedTipoUsuario;
                    }
                }
            });

            modalInstance.result.then(function() {
                $scope.modal_asso_tipo_acceso_not_finished = true;
                $scope.assoTipoAccesoTable.reload();
                
            }, function() {
                $scope.modal_asso_tipo_acceso_not_finished = true;
            });
        };

        $scope.watchPDF = function() {
            UsuariosTipoServiceFactory.getPDF(function(response) {
                    $timeout(function() {
                        $window.open(response.dataR);
                    }, 200);
            });
           // $window.open("aaa.pdf");
        };
        
    }]);

usuariosTipo.controller('ModalUsuarioTipoController',  function($scope, $http, $timeout, $uibModalInstance, selected_tipo_usuario, UsuariosTipoServiceFactory) {
//TODO comprobar si esto es realmente necesario o no
    $scope.selected_tipo_usuario = selected_tipo_usuario;

    $scope.deleteTipoUsuario = function(tipo_usuario) {
        UsuariosTipoServiceFactory.deleteTipoUsuario(tipo_usuario.ID_TIPO_USUARIO).then(function() {
            $uibModalInstance.close();
        });
    };

    $scope.updateTipoUsuario = function (tipo_usuario) {
        UsuariosTipoServiceFactory.updateTipoUsuario(tipo_usuario).then(function() {
            $uibModalInstance.close();
        });
    };

    $scope.createTipoUsuario = function (tipo_usuario) {
        UsuariosTipoServiceFactory.createTipoUsuario(tipo_usuario).then(function() {
            $uibModalInstance.close();
        });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

usuariosTipo.controller('ModalAssoTipoAccesoController', function($scope, $http, $timeout, $uibModalInstance, selected_tipo_usuario, UsuariosTipoServiceFactory) {
//TODO comprobar si esto es realmente necesario o no
    $scope.selected_tipo_usuario = selected_tipo_usuario;

    $scope.updateAsso = function (tipo_usuario) {
        UsuariosTipoServiceFactory.updateTipoUsuario(tipo_usuario).then(function() {
            $uibModalInstance.close();
        });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

    


    
 
