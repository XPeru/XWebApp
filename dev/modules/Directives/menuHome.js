var module = angular.module('MenuHome', []);

module.controller('menuHomeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        var ctrl = this;
        $rootScope.comment = "this is usless";
        ctrl.data = $scope.menuData;

    }
]);

module.directive('menuHome',function() {
	return {
		restrict: 'A',
		controller: 'menuHomeController',
        controllerAs: 'menuHomeCtrl',
		templateUrl:'dev/modules/Directives/menuhome.html',
		scope: {
            menuData:'='
        }
	};
});
