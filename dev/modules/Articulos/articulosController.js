var articulos = angular.module('Articulos', ['ui.bootstrap']);
//el orden de las variables tiene que ser el mismo en la declaracion de estas, y dentro de la funcion que define al controlador
articulos.controller('articulosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
											'ArticulosServiceFactory', 'NgTableParams', 'ArticulosCategoriaServiceFactory',
	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams, ArticulosCategoriaServiceFactory) {
		$scope.sortType     = 'ID_ARTICULO'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.search   = '';     // set the default search/filter term
        $scope.setType = function(type, search) {
            $scope.sortType = type;
            $scope.sortReverse = !$scope.sortReverse;
            $scope.search = search;
        };

        $scope.idSelectedArticulo = null;
		$scope.setSelected = function(idSelectedArticulo) {
			$scope.idSelectedArticulo = idSelectedArticulo;
		};

		$scope.callGetAllCategorias = function() {
			ArticulosCategoriaServiceFactory.getAllCategorias(function(response) {
				$timeout(function() {
					$scope.categoriaList = response.Categorias;
					console.info(response);
				}, 200);
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
			ArticulosServiceFactory.getArticuloList(function(response) {
				$timeout(function() {
					$scope.articlesData = response;
					$scope.articlesTable.reload();
				}, 200);
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
		ArticulosServiceFactory.updateArticulo(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, updated_article);
    };

    $scope.createArticulo = function (article_created) {
		ArticulosServiceFactory.createArticulo(function() {
			$timeout(function() {
				$uibModalInstance.close();
			}, 200);
		}, article_created);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
}).directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);



// articulos.controller('articulosController', ['$scope', '$location', '$http', '$uibModal', '$timeout',
// 	'ArticulosServiceFactory', 'NgTableParams',
// 	function($scope, $location, $http, $uibModal, $timeout, ArticulosServiceFactory, NgTableParams) {
// 		$scope.idSelectedArticulo = null;
// 		$scope.setSelected = function(idSelectedArticulo) {
// 			$scope.idSelectedArticulo = idSelectedArticulo;
// 		};
// 		$scope.articulosData = [{}];
// 		$scope.modal_not_finished = true;
// 		$scope.articulosTable = new NgTableParams({
// 			page: 1,
// 			count: 10
// 		}, {
// 			total: 0,
// 			counts: [],
// 			getData: function(params) {
// 				if ($scope.modal_not_finished) {
// 						$scope.callGetAllArticulos();
// 					} else {
// 						params.total($scope.articulosData.length);
// 						return $scope.articulosData;
// 					}
// 					$scope.modal_not_finished = false;
// 			}
			
// 		});

// 		$scope.callGetAllArticulos = function() {
// 			ArticulosServiceFactory.getAllArticulos(function(response) {
// 					$timeout(function() {
// 						$scope.articulosData = response;
// 						$scope.articulosTable.reload();
// 					}, 200);
// 			});
// 		};

// 		$scope.openModal = function(selected_modal, selected_articulo) {
// 			var modalInstance = $uibModal.open({
// 				templateUrl: function() {
// 					var template;
// 					switch(selected_modal) {
// 						case "create":
// 							template = 'dev/modules/Articulos/modals/createArticulo.html';
// 							break;
// 						case "edit":
// 							template = 'dev/modules/Articulos/modals/editArticulo.html';
// 							break;
// 						case "delete":
// 							template = 'dev/modules/Articulos/modals/deleteArticulo.html';
// 							break;
// 					}
// 					return template;
// 				},
// 				controller: 'ModalArticulo',
// 				resolve : {
// 					selected_articulo : function() {
// 						return selected_articulo;
// 					}
// 				}
// 			});

// 			modalInstance.result.then(function() {
// 				$scope.modal_not_finished = true;
// 				$scope.articulosTable.reload();
				
// 			}, function() {
// 				$scope.modal_not_finished = true;
// 			});
// 		};
// }]);

// articulos.controller('ModalArticulo', function($scope, $http, $timeout, $uibModalInstance, selected_articulo, ArticulosServiceFactory) {
// 	$scope.selected_articulo = selected_articulo;

// 	$scope.deleteArticulo = function(articulo_deleted) {
// 		ArticulosServiceFactory.deleteArticulo(function(response) {
// 			$timeout(function() {
// 				$uibModalInstance.close();
// 			}, 200);
// 		}, articulo_deleted);
// 	};

//     $scope.editArticulo = function (articulo_edited) {
// 		ArticulosServiceFactory.editArticulo(function(response) {
// 			$timeout(function() {
// 				$uibModalInstance.close();
// 			}, 200);
// 		}, articulo_edited);
//     };

//     $scope.createArticulo = function (articulo_created) {
// 		ArticulosServiceFactory.createArticulo(function(response) {
// 			$timeout(function() {
// 				$uibModalInstance.close();
// 			}, 200);
// 		}, articulo_created);
//     };

//     $scope.cancel = function() {
//       $uibModalInstance.dismiss('cancel');
//     };
// });