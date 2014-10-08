// public/js/services/readingService.js
angular.module('readingService', [])

	.factory('Reading', function($http) {

		return {
			// get all the readings
			get : function() {
				return $http.get('/~martin/brewmonitor/api/readings');
			},

			// save a reading (pass in reading data)
			save : function(readingData) {
				return $http({
					method: 'POST',
					url: '/~martin/brewmonitor/api/readings',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(readingData)
				});
			},

			// destroy a reading
			destroy : function(id) {
				return $http.delete('/~martin/brewmonitor/api/readings/' + id);
			}
		}

	});
	
