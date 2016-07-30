var articulos = angular.module('Articulos', ['ui.bootstrap']);
//el orden de las variables tiene que ser el mismo en la declaracion de estas, y dentro de la funcion que define al controlador
articulos.controller('articulosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
											'ArticulosServiceFactory', 'NgTableParams', 'ArticulosCategoriaServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams, ArticulosCategoriaServiceFactory) {
		$scope.sortType     = 'ID_ARTICULO'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        $scope.setType = function(type) {
            $scope.sortType = type;
            $scope.sortReverse = !$scope.sortReverse;
        };

        $scope.idSelectedArticulo = null;
		$scope.setSelected = function(idSelectedArticulo) {
			$scope.idSelectedArticulo = idSelectedArticulo;
		};

		$scope.callGetAllCategorias = function() {
			ArticulosCategoriaServiceFactory.getAllCategorias().then(function(response) {
				$scope.categoriaList = response.data.Categorias;
			});
		};

		$scope.callGetAllCategorias();
		$scope.articlesData = [{}];
		$scope.modal_article_not_finished = true;
		$scope.articlesTable = new NgTableParams({
			page: 1,
			count: 10
		}, {
			total: 0,
			counts: [],
			getData: function(params) {
				if ($scope.modal_article_not_finished) {
						$scope.callGetArticuloList();
					} else {
						params.total($scope.articlesData.length);
						return $scope.articlesData;
					}
					$scope.modal_article_not_finished = false;
			}
			
		});

		$scope.callGetArticuloList = function() {
			ArticulosServiceFactory.getArticuloList().then(function(response) {
				$scope.articlesData = response.data;
				$scope.articlesTable.reload();
			});
		};

		$scope.openModalArticulo = function(selected_modal, selected_article) {
			var modalInstance = $uibModal.open({
				templateUrl: function() {
					var template;
					switch(selected_modal) {
						case "create":
							template = 'dev/modules/Articulos/modals/createArticulo.html';
							break;
						case "edit":
							template = 'dev/modules/Articulos/modals/editArticulo.html';
							break;
						case "delete":
							template = 'dev/modules/Articulos/modals/deleteArticulo.html';
							break;
					}
					return template;
				},
				controller: 'ModalArticulo',
				resolve : {
					selected_article : function() {
						return selected_article;
					},
					categoriaList : function() {
						return $scope.categoriaList;
					}
				}
			});

			modalInstance.result.then(function() {
				$scope.modal_article_not_finished = true;
				$scope.articlesTable.reload();
				
			}, function() {
				$scope.modal_article_not_finished = true;
			});
		};

	}
]);

articulos.controller('ModalArticulo',  function ($scope, $http, $timeout, $uibModalInstance, selected_article, ArticulosServiceFactory, categoriaList) {
	//TODO comprobar si esto es realmente necesario o no
	$scope.selected_article = selected_article;
	$scope.categoriaList = categoriaList;
	$scope.deleteArticulo = function(article_to_delete) {
		ArticulosServiceFactory.deleteArticulo(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, article_to_delete);
	};

    $scope.updateArticulo = function (updated_article) {
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

    $scope.createArticulo = function (article_created) {
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

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

});
