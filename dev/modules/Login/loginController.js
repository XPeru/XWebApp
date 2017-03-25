'use strict';
 
angular
    .module('Login',[])
    .controller('loginController', ['$scope', '$location', 'LoginServiceFactory', function loginController ($scope, $location, LoginServiceFactory) {
    //var viewLogin = this;
    console.info("loginController");
    //viewLogin.login = login;

    /*(function initController() {
        // reset login status
        console.info("init controller");
        LoginServiceFactory.ClearCredentials();
    })();*/
    LoginServiceFactory.ClearCredentials();
    $scope.login = function (loginUser) {
        console.info("login controller, LoginServiceFactory.Login");
        loginUser.dataLoading = true;
        LoginServiceFactory.Login(loginUser.username, loginUser.password, function (response) {
            if (response.Users.length === 1) {
                LoginServiceFactory.SetCredentials(loginUser.username, loginUser.password);
                $location.path('/home');
            } else {/*
                FlashService.Error(response.message);*/
                loginUser.dataLoading = false;
            }
        });
    };
}]);
