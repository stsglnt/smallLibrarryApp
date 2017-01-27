var myApp = angular.module('myApp');

//
var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0])
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}
myApp.config(["$httpProvider", function ($httpProvider) {
     $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);
//


myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('BooksController loaded...');

    
/*authors library*/
    // to get all authors
    
	$scope.getAuthors = function(){
		$http.get('http://rest.learncode.academy/api/learncode/bookstore').then(function(response){
			$scope.authors = response.data;
            console.log('could find it');
		});
	}


   
    // add a new one 
	$scope.addAuthor = function(author){
        if(angular.isDefined(author.id)){
             $http.put('http://rest.learncode.academy/api/learncode/bookstore/'+ author.id, author).then(function(response){
            window.location.href='#/books';
                 $scope.closeModal();
                 $scope.getAuthors()
        })
        } else {
		$http.post('http://rest.learncode.academy/api/learncode/bookstore', author).then(function(response){
			window.location.href='#/books';
		});
       }
                $scope.closeModal();
                $scope.getAuthors()

	}
    
    //delete an author
    $scope.deleteAuthor = function(item){
        
		$http.delete('http://rest.learncode.academy/api/learncode/bookstore/' + item.id).then(function(response){
			
		});
       $scope.getAuthors();
	}
    $scope.editOrCreate = function (item){
        $scope.author =  item ? item : {}; 
        
        
        var modalelement = angular.element( document.querySelector( '#modalWindow' ) );
            modalelement.removeClass('modalHidden');
            modalelement.addClass('modalWindow');
        var body = angular.element(document.querySelector('body'));
            body.addClass('showing-modal');
       
    }
 
/*Books*/
    $scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('http://rest.learncode.academy/api/learncode/'+id).then(function(response){
			$scope.book = response.data;
            console.log('Managed to download', $scope.book);
		});
	}
     $scope.addBook = function(item){
		var id = $routeParams.id;
		$http.post('http://rest.learncode.academy/api/learncode/'+id, item).then(function(response){
			
            window.location.href='#/books';
		});
	}
	$scope.updateBook = function(item){
        var id2 = $routeParams.id

        $scope.anotherBook = item ? item : {}; 
        console.log('almost there', $scope.anotherBook);
            /* window.location.href = "#/books/edit";*/

        var modalelement = angular.element( document.querySelector( '#modalWindow' ) );
            modalelement.removeClass('modalHidden');
            modalelement.addClass('modalWindow');
        var body = angular.element(document.querySelector('body'));
            body.addClass('showing-modal');
        
        
    }
    $scope.saveUpdate = function(item)  {
        var id2 = $routeParams.id
                   console.log("it's working", id2);

	if(angular.isDefined(item.id)){
		$http.put('http://rest.learncode.academy/api/learncode/' + id2 + '/' + item.id, item).then(function(response){
            for (var i = 0; i < $scope.anotherBook.length; i++) {
                 if ($scope.anotherBook[i].id == response.data.id) {
                    $scope.anotherBook[i] = response;
                    break;
                }
            }
        })} else {
            $http.post('http://rest.learncode.academy/api/learncode/'+id2, item).then(function(response){
                $scope.getBook ();
                
        })}
                                                                                    
            
        var body = angular.element(document.querySelector('body'));
            body.removeClass('showing-modal');
	
        var modalelement = angular.element( document.querySelector( '#modalWindow' ) );
            modalelement.removeClass('modalWindow');
            modalelement.addClass('modalHidden');
       
		};
    $scope.closeModal = function(){
        var body = angular.element(document.querySelector('body'));
            body.removeClass('showing-modal');
	
        var modalelement = angular.element( document.querySelector( '#modalWindow' ) );
            modalelement.removeClass('modalWindow');
            modalelement.addClass('modalHidden');
        $scope.getBook ();
    }

	$scope.removeBook = function(item){
         var id2 = $routeParams.id
		$http.delete('http://rest.learncode.academy/api/learncode/' + id2 + '/' + item.id).then(function(response){
			
		});
        $scope.getBook ();
	}

    
}]);
