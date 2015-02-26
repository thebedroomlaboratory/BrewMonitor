'use strict';

angular.module('mainCtrl', [])

	// inject the Reading service into our controller
	.controller('mainController', function($scope, $http, Reading) {

		function rand(min, max){
			var num = Math.floor(Math.random()*(max-min+1)+min);
			if(num< 10) return '0'+num;

			return num;
		}
		// object to hold all the data for the new reading form
		$scope.readingData = {};

		$scope.mygdata = [];
		$scope.mygdataNewFormat = [];

		// Column
		$scope.mygoptions = {
			axes: {x: {type: "date", key: "x"}, y: {type: "linear", min: "15"}},
			tooltip: {
				mode: "scrubber",
				formatter: function (x, y, series) {
					console.log('formatter x', x);
					return moment(x).fromNow() + ' : ' + y;
				}
			},
			lineMode: 'linear',
			tension: 0.7,
			series: [
				{
					y: "y",
					label: "Beer Temperature",
					color: "#FBB117",
					axis: "y",
					type: "line",
					thickness: "1px",
					id: "series_0"
				},
				{
					y: "y2",
					label: "Target Temperature \(20C\)",
					color: "#aa0000",
					axis: "y",
					type: "line",
					thickness: "1px",
					id: "series_1"
				},
				{
					y: "y3",
					label: "Heating turns on below this \(19.8C\)",
					color: "#0000aa",
					axis: "y",
					type: "line",
					thickness: "1px",
					id: "series_2"
				}],
			drawLegend: true,
			drawDots: false,
			columnsHGap: 5
		};

		// loading variable to show the spinning loading icon
		$scope.loading = true;

		// get all the readings first and bind it to the $scope.readings object
		// use the function we created in our service
		// GET ALL READINGS ====================================================
		Reading.get()
			.success(function(data) {
				$scope.readings = data;

				//console.log('Reading data', data);
				$scope.loading = false;

				var print = true
				$.each(data, function(key,val){
					var t = val.created_at.split(/[- :]/);
					var d = moment(val.created_at+"Z");

					if(print){
						console.group();
						console.log('d', d);
						console.log('val', val.temp);
						console.groupEnd();
						print = false;
					}
					//d.tz('').format('ha z');
					//var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
					//$scope.mygdata.push({x:d,y:val.temp,y2:20,y3:19.8});
					$scope.mygdata.push({x:d,y:val.temp,y2:20+'.'+rand(1,19),y3:19+'.'+rand(1,19)});
					//console.log(val.created_at);
				})
			});

		Reading.getNew()
			.success(function(data) {
				//$scope.readings = data;

				//console.log('New Reading data', data);
				$scope.loading = false;

				var print = true
				$.each(data,function(key,val){
					var plot = {};
					//var t = val.created_at.split(/[- :]/);
					var d = moment(val.timestamp);
					plot.x = d;
					var temps = val.temps;
					for(var i = 0, len = temps.length; i < len; i++){
						console.log('temps['+i+'].temp', temps[i].temp);
						if (i === 0) plot['y'] = temps[i].temp;
						else{
							plot['y'+(i+1)] = temps[i].temp;
						}

					}
					if(print) {
						console.group('New Reading data');
						console.log('d', plot);
						console.log('val', val.temps);
						console.log('y', plot.y);
						console.log('y2', plot.y2);
						console.log('y3', plot.y3);
						console.groupEnd();
						//print = false;
					}

					//d.tz('').format('ha z');
					//var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

					$scope.mygdataNewFormat.push({x:plot.x,y:plot.y,y2:plot.y2,y3:18});

					//$scope.mygdataNewFormat.push({x:d,y:plot.y,y2:plot.y2,y3:plot.y3});
					//plot);//
					//console.log(val.created_at);
				})
			});
		// function to handle submitting the form
		// SAVE A READING ======================================================
		$scope.submitReading = function() {
			$scope.loading = true;

			// save the reading. pass in reading data from the form
			// use the function we created in our service
			Reading.save($scope.readingData)
				.success(function(data) {

					// if successful, we'll need to refresh the reading list
					Reading.get()
						.success(function(getData) {
							$scope.readings = getData;
							$scope.loading = false;
							$.each(data,function(key,val){
								var t = val.created_at.split(/[- :]/);
								var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
								$scope.mygdata.push({x:d,y:val.temp,y2:20,y3:19.8});
							})
						});

				})
				.error(function(data) {
					console.log(data);
				});
		};

		// function to handle deleting a reading
		// DELETE A READING ====================================================
		$scope.deleteReading = function(id) {
			$scope.loading = true;

			// use the function we created in our service
			Reading.destroy(id)
				.success(function(data) {

					// if successful, we'll need to refresh the reading list
					Reading.get()
						.success(function(getData) {
							$scope.readings = getData;
							$scope.loading = false;
							$.each(data,function(key,val){
								var t = val.created_at.split(/[- :]/);
								var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
								$scope.mygdata.push({x:d,y:val.temp,y2:20,y3:19.8});
							})
						});

				});
		};

	});