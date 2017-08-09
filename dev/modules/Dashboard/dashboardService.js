angular.module('dashboardService', ['ngResource'])
        .factory('DashboardServiceFactory',
            function ($http) {
                var service = {};
                var urlBase = '/api/dashboard';
                service.getIngresosStats = function () {
                    return $http.get(urlBase + '/ingresos');
                };

                return service;
            });
