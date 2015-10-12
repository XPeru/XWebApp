angular.module('UserList', [])

	// .controller('userListController', ['$scope', 'UsersFactory', 'UserFactory', '$location', '$http',
 //    	function ($scope, UsersFactory, UserFactory, $location, $http) {
	.controller('userListController', ['$scope', '$location', '$http',
    	function ($scope, $location, $http) {

	        // callback for ng-click 'editUser':
	        // $scope.editUser = function (userId) {
	        //     $location.path('/user-detail/' + userId);
	        // };

	        // callback for ng-click 'deleteUser':
	        $scope.deleteUser = function (userEmail) {
	            UserFactory.delete({ user_email: userEmail });
	            $scope.users = UsersFactory.query();
	        };
	        $http.delete('/api/userlist').then(function(result) {
	        	$scope.users = result.data.Users;
	        });
	        // $scope.deleteUser = function (userEmail) {
	        //     UserFactory.delete({ user_email: userEmail });
	        //     $scope.users = UsersFactory.query();
	        // };

	        // callback for ng-click 'createUser':
	        // $scope.createNewUser = function () {
	        //     $location.path('/user-creation');
	        // };

	        $http.get('/api/userlist').then(function(result) {
	        	$scope.users = result.data.Users;
	        });
    }]);
