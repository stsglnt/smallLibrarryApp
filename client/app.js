var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'BooksController',
		templateUrl: 'views/authors.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/authors.html'
	})
    .when('/add_author', {
		controller:'BooksController',
		templateUrl: 'views/add_author.html'
	})
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books/edit',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});


