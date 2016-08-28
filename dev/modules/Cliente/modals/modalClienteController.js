angular.module('Cliente').controller('modalClienteController',  function ($scope, $http, $timeout, $uibModalInstance, selected_cliente, ClienteServiceFactory, tipoClienteList) {
	var ctrl = this;
	ctrl.selected_cliente = selected_cliente;
    // Utilisar si la propiedad tipo o categoria corresponde
	//ctrl.tipoClienteList = tipoClienteList;

	ctrl.createCliente = function (create_cliente) {
		ClienteServiceFactory.createCliente(create_cliente).then(function() {
			$uibModalInstance.close();
		});
	};

    ctrl.updateCliente = function (update_cliente) {
		ClienteServiceFactory.updateCliente(update_cliente).then(function() {
			$uibModalInstance.close();
		});
    };

    ctrl.deleteCliente = function(delete_cliente) {
		ClienteServiceFactory.deleteCliente(delete_cliente).then(function() {
			$uibModalInstance.close();
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
