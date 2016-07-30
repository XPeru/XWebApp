angular.module('Usuarios').controller('modalUsuarioController',  function ($scope, $http, $timeout, $uibModalInstance, selected_user, UsuariosServiceFactory, tipoUsuarioList) {
	//TODO comprobar si esto es realmente necesario o no
	var ctrl = this;
	ctrl.selected_user = selected_user;
	ctrl.tipoUsuarioList = tipoUsuarioList;
	ctrl.deleteUsuario = function(user_to_delete) {
		UsuariosServiceFactory.deleteUsuario(user_to_delete).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.updateUsuario = function (updated_user) {
		UsuariosServiceFactory.uploadPhotoUsuario(updated_user.FOTO_FILE).then(function(response) {
			updated_user.FOTO = response.data;
			UsuariosServiceFactory.updateUsuario(updated_user).then(function(response) {
				$uibModalInstance.close();
				console.info(response);
			}, function(response) {
				console.info(response.status + " " + response.statusText);
			});
		}, function(response) {
			console.info(response.status + " " + response.statusText);
		});
    };

	ctrl.createUsuario = function (user_created) {
		UsuariosServiceFactory.uploadPhotoUsuario(user_created.FOTO_FILE).then(function(response) {
			user_created.FOTO = response.data;
			UsuariosServiceFactory.createUsuario(user_created).then(function(response) {
				$uibModalInstance.close();
				console.info(response);
			}, function(response) {
				console.info(response.status + " " + response.statusText);
			});
		}, function(response) {
			console.info(response.status + " " + response.statusText);
		});
	};

    ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
    };

}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function() {
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);