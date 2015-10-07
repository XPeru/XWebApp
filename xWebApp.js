angular.module('xWebApp', [
	'NavBar',
	'Home',
	'ngRoute',
	'ui.router'
])

	.controller('TodoListController', function() {
		var todoList = this;
		todoList.todos = [
			{text:'learn angular', done:true},
			{text:'build an angular app', done:false}
		];

		todoList.addTodo = function() {
			todoList.todos.push({text:todoList.todoText, done:false});
			todoList.todoText = '';
		};

		todoList.remaining = function() {
			var count = 0;
			angular.forEach(todoList.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};

		todoList.archive = function() {
			var oldTodos = todoList.todos;
			todoList.todos = [];
			angular.forEach(oldTodos, function(todo) {
				if (!todo.done) todoList.todos.push(todo); 
			});
		};
	})

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				controller: 'homeController',
				templateUrl: 'modules/Home/home.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			})
			.state('nav', {
				url: '/nav',
				controller: 'navBarController',
				templateUrl: 'modules/NavBar/nav.html',
				hideMenus: true,
				data: {},
				reloadOnSearch: false
			});

		$urlRouterProvider.otherwise('home');
	}]);