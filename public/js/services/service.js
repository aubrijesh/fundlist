app.factory('mainService', ['$http',function($http) {
	return {
		get : function(url, callback) {
			return  $http.get(url).
				    then(function(response) {
				    	callback(response);
				    }, function(err) {
				    	callback(err);
				    });
		},
		create : function(todoData) {
			return $http.post('/api/todos', todoData);
		},
		delete : function(id) {
			return $http.delete('/api/todos/' + id);
		}
	}
}]);