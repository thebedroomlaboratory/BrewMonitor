'use strict';

describe('Controller: BrewMonitorCtrl', function () {

  // load the controller's module
  beforeEach(module('BrewApp'));

  var BrewMonitorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrewMonitorCtrl = $controller('BrewMonitorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
