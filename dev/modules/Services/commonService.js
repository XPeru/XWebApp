"use strict";

angular.module('commonService', ['ngResource'])
	.factory('CommonServiceFactory',
		function() {
			var service = {};

            service.formatColumn = function (name, field, color, filter) {
				var obj = {
					title: name,
					displayName: name,
					field: field,
					filter: {},
					headerCellClass: color,
					sortable: field
				};
				obj.filter[field] = filter;
				return obj;
			};

			service.buttons = function () {
				return {
					field: "BUTTONS"
				};
			};

			return service;
		}
);
