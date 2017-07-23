angular.module('ArticulosCategoria').controller('modalCategoriaController',
		function($scope, $http, $timeout, $uibModalInstance, selectedData, ArticulosCategoriaServiceFactory) {
			var ctrl = this;
			ctrl.selected_categoria = selectedData;

			ctrl.deleteCategoria = function(categoria_deleted) {
				ArticulosCategoriaServiceFactory.deleteCategoria(categoria_deleted).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.editCategoria = function(categoria_edited) {
				ArticulosCategoriaServiceFactory.editCategoria(categoria_edited).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.createCategoria = function(categoria_created) {
				ArticulosCategoriaServiceFactory.createCategoria(categoria_created).then(function() {
					$uibModalInstance.close();
				});
			};

			ctrl.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};
		}
);
