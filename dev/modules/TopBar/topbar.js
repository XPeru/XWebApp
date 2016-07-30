"use strict";
/*global $*/
angular.module('TopBar', [])
	
	.controller('topbarController', ['$scope', '$rootScope', '$timeout', 'AlmacenesGestionServiceFactory', function ($scope, $rootScope, $timeout, AlmacenesGestionServiceFactory) {
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

		var url = window.location.href;
		console.info("this is url");
		console.info(url);

		$scope.block = false;
		var element = $('ul.nav a').filter(function() {
			/*console.info("this is this");
			console.info(this);
			console.info("this is this.href");
			console.info(this.href);
			console.info("this is the return");
			console.info(this.href === url);*/
			return this.href === url;
		}).addClass('active').parent().parent().addClass('in').parent();
		if (element.is('li')) {
			element.addClass('active');
		}
		$scope.callGetAllAlmacenes = function() {
			if(!$scope.block) {
				console.info("getting data");
				AlmacenesGestionServiceFactory.getAllAlmacenes(function(response) {
					$timeout(function() {
						$scope.almacenesData = response;
						
					}, 200).then(function() {
						$scope.block = true;
					});
			});
			}
			
			
		};
		$scope.callGetAllAlmacenes();

	}])

	.directive('topBar',
		function() {
			return {
				controller: 'topbarController',
				restrict: 'E',
				templateUrl: 'dev/modules/TopBar/topbar.html',
				scope: {
					usuarios: '@',
					usuariostipo: '@',
					usuariosacceso: '@'
				}
			};
		});
