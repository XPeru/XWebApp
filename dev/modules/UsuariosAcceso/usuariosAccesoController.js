var usuariosTipo = angular.module('UsuariosAcceso', ['ui.bootstrap']);
usuariosTipo.controller('usuariosAccesoController', ['$scope', '$location', '$http', '$uibModal', '$timeout', 'UsuariosAccesoServiceFactory', 'NgTableParams',
    function($scope, $location, $http, $uibModal, $timeout, UsuariosAccesoServiceFactory, NgTableParams) {
        $scope.usuariosAccesoData = [{}];
        $scope.modal_acceso_usuario_not_finished = true;
        $scope.usuariosAccesoTable = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: 0,
            counts: [],
            getData: function(params) {
                if ($scope.modal_acceso_usuario_not_finished) {
                        $scope.callGetAllAccesoUsuario();
                    } else {
                        params.total($scope.usuariosAccesoData.length);
                        return $scope.usuariosAccesoData;
                    }
                    $scope.modal_acceso_usuario_not_finished = false;
            }
            
        });

        $scope.callGetAllAccesoUsuario = function() {
            UsuariosAccesoServiceFactory.getAllAccesoUsuario(function(response) {
                    $timeout(function() {
                        $scope.usuariosAccesoData = response;
                        $scope.usuariosAccesoTable.reload();
                    }, 200);
            });
        };

        $scope.idSelectedAccesoUsuario = null;
        $scope.setSelected = function(idSelectedAccesoUsuario) {
            $scope.idSelectedAccesoUsuario = idSelectedAccesoUsuario;
        };

        $scope.openModalAccesoUsuario = function(selected_modal, selected_acceso_usuario) {
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
                controller: 'ModalUsuarioAccesoController',
                resolve : {
                    selected_acceso_usuario : function() {
                        return selected_acceso_usuario;
                    }
                }
            });

            modalInstance.result.then(function() {
                $scope.modal_acceso_usuario_not_finished = true;
                $scope.usuariosTipoTable.reload();
                
            }, function() {
                $scope.modal_acceso_usuario_not_finished = true;
            });
        };

        
    }]);

usuariosTipo.controller('ModalUsuarioAccesoController',  function($scope, $http, $timeout, $uibModalInstance, selected_acceso_usuario, UsuariosAccesoServiceFactory) {
//TODO comprobar si esto es realmente necesario o no
    $scope.selected_acceso_usuario = selected_acceso_usuario;

    $scope.deleteAccesoUsuario = function(acceso_usuario) {
        UsuariosAccesoServiceFactory.deleteAccesoUsuario(function() {
            $timeout(function() {
                $uibModalInstance.close();
            }, 200);
        }, acceso_usuario.ID_ACCESO_USUARIO);
    };

    $scope.updateAccesoUsuario = function (acceso_usuario) {
        UsuariosAccesoServiceFactory.updateAccesoUsuario(function() {
            $timeout(function() {
                $uibModalInstance.close();
            }, 200);
        }, acceso_usuario);
    };

    $scope.createAccesoUsuario = function (acceso_usuario) {
        UsuariosAccesoServiceFactory.createAccesoUsuario(function() {
            $timeout(function() {
                $uibModalInstance.close();
            }, 200);
        }, acceso_usuario);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

    


    
 
