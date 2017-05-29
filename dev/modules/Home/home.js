"use strict";
angular.module('Home', [])

	.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		var ctrl = this;
		ctrl.comment ="this is usless";
		$rootScope.comment2 ="this is usless";
		ctrl.showUserMenu = false;
		ctrl.showArticulosMenu = false;
		ctrl.showCliProvMenu = false;
		ctrl.showAlmacenesMenu = false;

		ctrl.switchUserMenu = function() {
			ctrl.showUserMenu = !ctrl.showUserMenu;
			ctrl.showArticulosMenu = false;
			ctrl.showCliProvMenu = false;
			ctrl.showAlmacenesMenu = false;
		};
	}]);