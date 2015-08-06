app.controller('mainController', ['$scope', 'mainService', '$compile', function($scope, MainService, $compile) {
	$scope.filter = [];
	$scope.funds = [];
	$scope.Chartdata = [];
    $scope.search = {};
	$scope.slider = {
	    min: 0,
	    max: 0
	};
    $scope.totalItems = 0;
    $scope.currentPage = 0;
    $scope.numPerPage = 25;

    $scope.typeCheckboxChange = function(val,$event){
        $scope.numPerPage = $scope.totalItems;
        $scope.search = {};
        var checkbox = $event.target;
        if(checkbox.checked){
            $scope.search['TypeId'] = val;
        }else{
            delete $scope.search['TypeId'];
        }
    };

    $scope.ShareClassSelectChange = function(){
        $scope.numPerPage = $scope.totalItems;
        $scope.search = {};
        if($scope.ShareClassSelect != null){
            $scope.search['Shareclass'] = $scope.ShareClassSelect.FilterName;
        }
    };

    $scope.CurrencySelectChange = function(){
        $scope.numPerPage = $scope.totalItems;
        $scope.search = {};
        if($scope.CurrencySelect != null){
            $scope.search['CurrencyCode'] = $scope.CurrencySelect.FilterId;
        }
    };

    $scope.regionCheckboxChange = function(val,$event){
        $scope.numPerPage = $scope.totalItems;
        $scope.search = {};
        var checkbox = $event.target;

        if(checkbox.checked){
            $scope.search['Sector'] = val;
        }else{
            delete $scope.search['Sector'];
        }
    };

    $scope.ratingCheckboxChange = function(val,$event){
        $scope.numPerPage = $scope.totalItems;
        $scope.search = {};
        var checkbox = $event.target;

        if(checkbox.checked){
            $scope.search['Morningstar_Rating'] = val;
        }else{
            delete $scope.search['Morningstar_Rating'];
        }
    };

	$scope.options = {
            chart: {
                type: 'cumulativeLineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]/100; },

                color: d3.scale.category10().range(),
                transitionDuration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 20
                }
            }
        };

	$scope.paginate = function(value) {
	    var begin, end, index;
	    begin = $scope.currentPage  * $scope.numPerPage;
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

    $scope.setCurrent = function(val){
        if(val < 0){
            val = 0;
        }
    	$scope.currentPage = val;
    	$scope.paginate($scope.currentPage);
    };

    $scope.toggleChart = function(index){
    	$scope['showchart' + index] = !$scope['showchart' + index];
    	if($scope['showchart' + index]){
    		var template = '<nvd3 options="options" data="Chartdata"></nvd3>';
        	angular.element(document.getElementsByClassName('chart'+ index)).append($compile(template)($scope));
    	}else {
    		angular.element(document.getElementsByClassName('chart'+ index)).html("");
    	}
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

	MainService.get('http://localhost:8000/data/chart', function(result){
		if(result['status'] === 200){
			$scope.Chartdata =result['data']['chart'];
		}
	});

}]);