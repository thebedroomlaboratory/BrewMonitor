'use strict';

angular.module('readingService', [])

	.factory('Reading', function($http) {

		return {
			// get all the readings
			get : function() {
				return $http.get('brewmonitor/api/readings');
			},
			getNew : function(){
				return $http.get('brewmonitor/api/list');
			},

			// save a reading (pass in reading data)
			save : function(readingData) {
				return $http({
					method: 'POST',
					url: 'brewmonitor/api/add',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(readingData)
				});
			},

			// destroy a reading
			destroy : function(id) {
				return $http.delete('/Frontend/brewmonitor/api/readings/' + id);
			}
		}

	});
