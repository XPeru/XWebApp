angular.module('Ingreso').controller('modalIngresoController',  function ($scope, $http, $timeout, $uibModalInstance, selectedIngreso, IngresoServiceFactory, tipoDocumentoList, proveedorList) {
	var ctrl = this;
	ctrl.selectedIngreso = selectedIngreso;
	ctrl.tipoDocumentoList = tipoDocumentoList;
	ctrl.proveedorList = proveedorList;
	// Utilisar si la propiedad tipo o categoria corresponde
	//ctrl.tipoIngresoList = tipoIngresoList;

	ctrl.createIngreso = function(create_ingreso) {
		IngresoServiceFactory.createIngreso(create_ingreso).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.updateIngreso = function(update_ingreso) {
		IngresoServiceFactory.updateIngreso(update_ingreso).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.deleteIngreso = function(delete_ingreso) {
		IngresoServiceFactory.deleteIngreso(delete_ingreso).then(function() {
			$uibModalInstance.close();
		});
	};

	ctrl.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	
	function getDayClass(data) {
		var date = data.date,
			mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}
	}

	ctrl.options = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: true
	};

	

});