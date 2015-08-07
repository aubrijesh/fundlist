app.factory('mainService', ['$http',function($http) {
	return {
		get : function(url, callback) {
			return  $http.get(url).
				    then(function(response) {
				    	callback(response);
				    }, function(err) {
				    	callback(err);
				    });
		}/*
		TODO : Funtionality for future,
		create : function(todoData) {
			
		},
		delete : function(id) {
			
		}*/
	}
}]);