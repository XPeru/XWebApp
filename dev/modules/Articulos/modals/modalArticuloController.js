angular.module('Articulos').controller('modalArticuloController', function($scope, $http, $timeout, $uibModalInstance, selected_article, ArticulosServiceFactory, categoriaList) {
	//TODO comprobar si esto es realmente necesario o no
	var ctrl = this;
	ctrl.selected_article = selected_article;
	ctrl.categoriaList = categoriaList;
	ctrl.deleteArticulo = function(article_to_delete) {
		ArticulosServiceFactory.deleteArticulo(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, article_to_delete);
	};

	ctrl.updateArticulo = function(updated_article) {
		ArticulosServiceFactory.uploadImageArticulo(updated_article.IMAGEN_FILE).then(function(response) {
			updated_article.IMAGEN = response.data;
			ArticulosServiceFactory.updateArticulo(updated_article).then(function(response) {
				$uibModalInstance.close();
				console.info(response);
			}, function(response) {
				console.info(response.status + " " + response.statusText);
			});
		}, function(response) {
			console.info(response.status + " " + response.statusText);
		});
	};

	ctrl.createArticulo = function(article_created) {
		ArticulosServiceFactory.uploadImageArticulo(article_created.IMAGEN_FILE).then(function(response) {
			article_created.IMAGEN = response.data;
			console.info("verify this");
			console.info(response.data);
			console.info(article_created.IMAGEN_FILE);
			ArticulosServiceFactory.createArticulo(article_created).then(function(response) {
				$uibModalInstance.close();
				console.info(response);
			}, function(response) {
				console.info(response.status + " " + response.statusText);
			});
		}, function(response) {
			console.info(response.status + " " + response.statusText);
		});
	};

	ctrl.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

});