// public/js/controllers/mainCtrl.js
angular.module('mainCtrl', [])

	// inject the Reading service into our controller
	.controller('mainController', function($scope, $http, Reading) {
		// object to hold all the data for the new reading form
		$scope.readingData = {};

		$scope.mygdata = [];

  		// Column
  		$scope.mygoptions = {
			axes: {x: {type: "date", key: "x"}, y: {type: "linear", min: "0"}},
    			tooltip: {
    				mode: "scrubber",
				formatter: function (x, y, series) {
      					return moment(x).fromNow() + ' : ' + y;
    				}
    			},
    			lineMode: 'linear',
    			tension: 0.7,
    			series: [
    			{
      				y: "y",
      				label: "Temperature",
      				color: "#9467bd",
      				axis: "y",
      				type: "line",
      				thickness: "2px",
      				id: "series_0"
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
				$scope.loading = false;
				$.each(data,function(key,val){
					var t = val.created_at.split(/[- :]/);
					var d = moment(val.created_at+"Z");
					$scope.mygdata.push({x:d,y:val.temp});
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
									var d = moment(val.created_at+"Z");
                    				$scope.mygdata.push({x:d,y:val.temp});
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
								var d = moment(val.created_at+"Z");
                    			$scope.mygdata.push({x:d,y:val.temp});
                			})
						});

				});
		};

	});

