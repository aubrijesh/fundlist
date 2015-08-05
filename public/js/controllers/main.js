app.controller('mainController', ['$scope', 'mainService', function($scope, MainService) {
	$scope.filter = [];
	$scope.funds = [];
	$scope.slider = {
	    min: 0,
	    max: 0
	};

	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.numPerPage = 5;

	$scope.paginate = function(value) {
	    var begin, end, index;
	    begin = ($scope.currentPage - 1) * $scope.numPerPage;
	    end = begin + $scope.numPerPage;
	    index = $scope.funds.indexOf(value);
	    return (begin <= index && index < end);
	};

	$scope.range = function(count){
        var array = [];

        for (var i = 0; i < count; i++) {
            array.push(i);
        }

        return array;
    };

	MainService.get('http://localhost:8000/data/filter', function(result){
		if(result['status'] === 200){
			$scope.filter = result['data']['Rows'];

			$scope.filter.forEach(function(val){
				if(val.FilterTypeName == 'Fund Size'){
					if($scope.slider['max'] < val.FilterName){
						$scope.slider['min'] = $scope.slider['max'];
						$scope.slider['max'] = val.FilterName;
					}
				}
			});
		}
	});

	MainService.get('http://localhost:8000/data/funds', function(result){
		if(result['status'] === 200){
			$scope.funds = result['data']['Rows'];
			$scope.totalItems = $scope.funds.length;
		}
	});

}]);