app.controller('mainController', ['$scope', 'mainService', function($scope, MainService) {
	$scope.filter = [];

	MainService.get('http://localhost:8000/data/filter', function(result){
		if(result['status'] === 200){
			$scope.filter = result['data']['Rows'];
		}
	});

}]);