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

				var element = $('ul.nav li a').filter(function() {
/*					console.info("baseURI");
					console.info(this.baseURI);
					console.info("pathName");
					console.info(this.pathname);
					console.info(this.baseURI.substring(24) === this.pathname.substring(1));*/
					return this.baseURI.substring(24) === this.pathname.substring(1);
				}).addClass('active').parent().parent().addClass('in').parent();
				if (element.is('li')) {
					element.addClass('active');
				}

				ctrl.callGetAllAlmacenes = function() {
						AlmacenesGestionServiceFactory.getAllAlmacenes().then(function(response) {
							ctrl.almacenesData = response.data;
						});

				};

				ctrl.callGetAllAlmacenes();

				ctrl.setSelectedMenu = function(nameMenu) {
					ctrl.selectedMenu = nameMenu;
				};

			}
]);