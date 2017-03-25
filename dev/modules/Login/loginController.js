'use strict';
 
angular
    .module('Login',[])
    .controller('loginController', ['$scope', '$location', 'LoginServiceFactory', function loginController ($scope, $location, LoginServiceFactory) {
    //var viewLogin = this;
    var ctrl = this;
    console.info("loginController");
    //viewLogin.login = login;

    /*(function initController() {
        // reset login status
        console.info("init controller");
        LoginServiceFactory.ClearCredentials();
    })();*/
    LoginServiceFactory.ClearCredentials();
    ctrl.login = function (loginUser) {
        console.info("login controller, LoginServiceFactory.Login");
        loginUser.dataLoading = true;
        LoginServiceFactory.Login(loginUser.email, loginUser.password, function (response) {
            if (response.Users.length === 1) {
                LoginServiceFactory.SetCredentials(loginUser.email, loginUser.password);
                $location.path('/home');
            } else {
                /*FIX THIS SHIT*/
                window.alert("WRONG PASSWORD");
                LoginServiceFactory.ClearCredentials();
            }
        });
    };
}]);
