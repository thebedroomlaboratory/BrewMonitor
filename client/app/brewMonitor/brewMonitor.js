'use strict';

angular.module('BrewApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('brewMonitor', {
        url: '/monitor',
        templateUrl: 'app/brewMonitor/brewMonitor.html',
        controller: 'BrewMonitorCtrl'
      });
  });