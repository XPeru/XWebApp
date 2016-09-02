"use strict";
/*global $*/
angular.module('TopBar', [])
	
	.controller('topbarController', ['$scope',
									'$rootScope',
									'$timeout',
									'AlmacenesGestionServiceFactory',
									//'$stateParams',
			function ($scope, $rootScope, $timeout, AlmacenesGestionServiceFactory) {
				var ctrl = this;
				var url = window.location.href;
				ctrl.selectedMenu = url.substring(24);
				$("#menu").metisMenu();

				$(window).bind("load resize", function() {
					var topOffset = 50;
					var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
					if (width < 768) {
						$('div.navbar-collapse').addClass('collapse');
						topOffset = 100; // 2-row-menu
					} else {
						$('div.navbar-collapse').removeClass('collapse');
					}

					var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
					height = height - topOffset;
					if (height < 1) {
						height = 1;
					}
					if (height > topOffset) {
						$("#page-wrapper").css("min-height", (height) + "px");
					}
				});

				$('ul.nav-second-level a').filter(function() {
					return this.baseURI.substring(24) === this.pathname.substring(1);
				}).parent().parent().addClass('in');

				$('ul.nav-third-level a').filter(function() {
					/*console.info("baseURI");
					console.info(this);
					console.info("pathName");
					console.info(this.pathname.substring(1).split(/[ /]+/));
					console.info(this.baseURI.substring(24).split(/[ /]+/)[0] === this.pathname.substring(1).split(/[ /]+/)[0]);*/
					return this.baseURI.substring(24).split(/[ /]+/)[0] === this.pathname.substring(1).split(/[ /]+/)[0];
				}).parent().parent().addClass('in').parent().parent().addClass('in');

				ctrl.callGetAllAlmacenes = function() {
					AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {
						ctrl.almacenesData = response.data;
					});
				};

				ctrl.callGetAllAlmacenes();

				ctrl.setSelectedMenu = function(nameMenu) {
					ctrl.selectedMenu = nameMenu;
				};

				ctrl.lateralMenu = true;
				$rootScope.toLeft = true;
				ctrl.showLateralMenu = function() {
					ctrl.lateralMenu = !ctrl.lateralMenu;
					$rootScope.toLeft = !$rootScope.toLeft;
				};

			}
]);