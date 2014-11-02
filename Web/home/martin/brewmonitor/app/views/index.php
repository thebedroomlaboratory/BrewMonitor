<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>BrewMonitor</title>

	<!-- CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"> <!-- load bootstrap via cdn -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> <!-- load fontawesome -->
	<style>
		body 		{ padding-top:30px; }
		form 		{ padding-bottom:20px; }
		.comment 	{ padding-bottom:20px; }
	</style>

	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>

	<!-- ANGULAR -->
	<!-- all angular resources will be loaded from the /public folder -->
		<script type="text/javascript" src="js/controllers/mainCtrl.js"></script> <!-- load our controller -->
		<script type="text/javascript" src="js/services/readingService.js"></script> <!-- load our service -->
		<script type="text/javascript" src="js/app.js"></script> <!-- load our application -->
		<script type="text/javascript" src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
		<script type="text/javascript" src="js/graphing/line-chart.min.js"></script>
		<script type="text/javascript" src="js/graphing/moment.min.js"></script>
		<script type="text/javascript" src="js/graphing/angular-moment.min.js"></script>

</head>
<!-- declare our angular app and controller -->
<body class="container" ng-app="readingApp" ng-controller="mainController">
<div class="col-md-8 col-md-offset-2">

	<!-- PAGE TITLE =============================================== -->
	<div class="page-header">
		<h2>BrewMonitor Application</h2>
		<h4>Temperature Reading System</h4>
	</div>

	<!-- NEW READING FORM =============================================== -->
	<!-- <form ng-submit="submitReading()"> 
		<div class="form-group">
			<input type="number" step="any" class="form-control input-sm" name="device" ng-model="readingData.device">
		</div>

		<div class="form-group">
			<input type="number" step="any" class="form-control input-sm" name="reading" ng-model="readingData.temp">
		</div>

		<div class="form-group text-right">
			<button type="submit" class="btn btn-primary btn-lg">Submit</button>
		</div>
	</form> -->

	<!-- LOADING ICON =============================================== -->
	<!-- show loading icon if the loading variable is set to true -->
	<p class="text-center" ng-show="loading"><span class="fa fa-meh-o fa-5x fa-spin"></span></p>

	<!-- THE READINGS =============================================== -->
	<!-- hide these readings if the loading variable is true -->
	<!-- <div class="reading" ng-hide="loading" ng-repeat="reading in readings">
		<h3>Reading #{{ reading.id }} <small>by device {{ reading.device }}</h3>
		<p>{{ reading.temp }}</p>

		<p><a href="#" ng-click="deleteReading(reading.id)" class="text-muted">Delete</a></p>
	</div> -->
	<div class="reading" ng-hide="loading">
		<linechart data="mygdata" options="mygoptions"></linechart>
	</div>

</div>
</body>
</html>