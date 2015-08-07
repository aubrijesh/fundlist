app.controller('mainController', ['$scope', 'mainService', '$compile', '$filter', function($scope, MainService, $compile, $filter) {
	$scope.filter = [];
    $scope.WATCHLIST = [];
	$scope.funds = [];
	$scope.Chartdata = [];
    $scope.typeFilter = {};
    $scope.classFilter = {};
    $scope.currencyFilter = {};
    $scope.regionFilter = {};
    $scope.starFilter = {};
    $scope.watchFilter = {};
    $scope.nameFilter = {};
    $scope.typeahead = [];
    $scope.watchlist = 0;
    $scope.timeout = 3000;
	$scope.slider = {
	    min: 0,
	    max: 0
	};
	$scope.slider_model = {
        min:10,
        max: 20
    };
    $scope.totalItems = 0;
    $scope.currentPage = 0;
    $scope.numPerPage = 25;

    $scope.watchAndClearFilter = function(){
        if(Object.keys($scope.typeFilter).length === 0 && Object.keys($scope.classFilter).length === 0 &&
        Object.keys($scope.currencyFilter).length === 0 && Object.keys($scope.regionFilter).length === 0
        && Object.keys($scope.starFilter).length === 0 && Object.keys($scope.watchFilter).length === 0
        && Object.keys($scope.nameFilter).length === 0){
            setTimeout(function(){
                $scope.$apply(function () {
                    $scope.numPerPage = 25;
                });
            }, $scope.timeout);
        }
    };

    $scope.typeaheadSelect = function(val) {
        $scope.nameFilter['FundName'] = val;
        $scope.numPerPage = $scope.totalItems;
    };

    $scope.loosefocus = function(){
        setTimeout(function(){
            $scope.$apply(function () {
                $scope.typeahead = [];
                $scope.searchbox = "";
            });
        }, 500);
    };

    $scope.keyPress = function($event){
        if($scope.searchbox === ""){
            $scope.typeahead = [];
        }else{
            $scope.typeahead = $filter('filter')($scope.funds, {"Name": $scope.searchbox});
        }
    };

    $scope.watchFilterFunc = function($event){
        $scope.watchFilter = {};
        $scope.numPerPage = $scope.totalItems;
        var checkbox = $event.target;
        if(checkbox.checked){
            $scope.watchFilter['WATCHLIST'] = 1;
        }
    };

    $scope.addWatchList = function(index){
        $scope.funds[index].WATCHLIST = 1;
        $scope.WATCHLIST[index] = 1;
        $scope.watchlist++;
    };

    $scope.removeWatchList = function(index){
        $scope.funds[index].WATCHLIST = 0;
        $scope.WATCHLIST[index] = 0;
        $scope.watchlist--;
    };

    $scope.clearFilter  = function(){
        $scope.typeFilter = {};
        $scope.classFilter = {};
        $scope.currencyFilter = {};
        $scope.regionFilter = {};
        $scope.starFilter = {};
        $scope.watchFilter = {};
        $scope.nameFilter = {};
        $(".checkbox").attr("checked", false);
        $scope.ShareClassSelect = '';
        $scope.CurrencySelect = '';
        $scope.numPerPage = 25;
    };

    $scope.$watch('nameFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.$watch('typeFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.$watch('classFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.$watch('currencyFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.$watch('regionFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.$watch('starFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.$watch('watchFilter', function() {
       $scope.watchAndClearFilter();
    });

    $scope.typeCheckboxChange = function(val,$event){
        $scope.typeFilter = {};
        $scope.numPerPage = $scope.totalItems;
        var checkbox = $event.target;
        if(checkbox.checked){
            $scope.typeFilter['TypeId'] = val;
        }
    };

    $scope.ShareClassSelectChange = function(){
        $scope.classFilter = {};
        $scope.numPerPage = $scope.totalItems;
        if($scope.ShareClassSelect != null){
            $scope.classFilter['Shareclass'] = $scope.ShareClassSelect.FilterName;
        }
    };

    $scope.CurrencySelectChange = function(){
        $scope.currencyFilter = {};
        $scope.numPerPage = $scope.totalItems;
        if($scope.CurrencySelect != null){
            $scope.currencyFilter['CurrencyCode'] = $scope.CurrencySelect.FilterId;
        }
    };

    $scope.regionCheckboxChange = function(val,$event){
        $scope.regionFilter = {};
        $scope.numPerPage = $scope.totalItems;
        var checkbox = $event.target;

        if(checkbox.checked){
            $scope.regionFilter['Sector'] = val;
        }
    };

    $scope.ratingCheckboxChange = function(val,$event){
        $scope.starFilter = {};
        $scope.numPerPage = $scope.totalItems;
        var checkbox = $event.target;

        if(checkbox.checked){
            $scope.starFilter['Morningstar_Rating'] = val;
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
						$scope.slider.min = $scope.slider.max;
                				   // $scope.slider.min=0;
						$scope.slider.max = Number(val.FilterName);
                				$scope.slider_model.min=$scope.slider.min ;
                				$scope.slider_model.max=$scope.slider.max;
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
			$scope.Chartdata = result['data']['chart'];
		}
	});

}]);
