
/*global $*/
angular.module('TopBar', [])
	
	.controller('topbarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
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

		var url = window.location;
		var element = $('ul.nav a').filter(function() {
			return this.href == url;
		}).addClass('active').parent().parent().addClass('in').parent();
		if (element.is('li')) {
			element.addClass('active');
		}
	}])

	.directive('topBar',
		function() {
			return {
				controller: 'topbarController',
				restrict: 'E',
				templateUrl: 'dev/modules/TopBar/topbar.html',
				scope: {
					usuarios: '@',
					usuariotipo: '@',
					usuarioacceso: '@'
				}
			};
		});
