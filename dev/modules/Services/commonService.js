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

            service.modal = function (ctrl) {
                ctrl.modalCreate = Object.assign({}, ctrl.modal, {
    				mode: 'create',
    				buttonClass: 'pull-right btn btn-small btn-success btn_separate',
    				iconClass: 'glyphicon glyphicon-plus',
    				text: 'Nuevo '
    			});

    			ctrl.modalEdit = Object.assign({}, ctrl.modal, {
    				mode: 'edit',
    				buttonClass: 'btn btn-small btn-primary',
    				iconClass: 'glyphicon glyphicon-pencil'
    			});

    			ctrl.modalDelete = Object.assign({}, ctrl.modal, {
    				mode: 'delete',
    				buttonClass: 'btn btn-small btn-danger',
    				iconClass: 'glyphicon glyphicon-remove'
    			});
            };

            service.switchTableMode = function (ctrl) {
                ctrl.switchTableMode = function () {
                    ctrl.tableMode = !ctrl.tableMode;
                };
            };
            
            service.setSelected = function (ctrl, name) {
                ctrl.setSelected = function(id) {
    				ctrl[name] = id;
    			};
            };



			return service;
		}
);
