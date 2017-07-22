var module = angular.module('ModalDirective', []);

module.controller('modalDirectiveController', ['$scope', '$rootScope', '$uibModal', function ($scope, $rootScope, $uibModal) {
        var ctrl = this;
        $rootScope.comment = "this is usless";
        ctrl.modalData = $scope.modalData;
        ctrl.modalSelectedData = $scope.modalSelectedData;

        ctrl.openModal = function () {
            var modalInstance = $uibModal.open({
                templateUrl: function() {
                    return ctrl.modalData.url[ctrl.modalData.mode];
                },
                controller: ctrl.modalData.controller,
                controllerAs: ctrl.modalData.controllerAs,
                resolve : {
                    selectedData : function () {
                         return  ctrl.modalSelectedData;
                    }
                }
            });

            modalInstance.result.then(function() {
                //$parent.callGetAll();
                //$parent.table.reload();

            }, function() {
                //$parent.callGetAll();
                //$parent.table.reload();
            });
        };

    }
]);

module.directive('modalDirective',function() {
	return {
		restrict: 'A',
		controller: 'modalDirectiveController',
        controllerAs: 'modalDirectiveCtrl',
		templateUrl:'dev/modules/Directives/modal.html',
		scope: {
            modalData:'=',
            modalSelectedData:'='
        }
	};
});
