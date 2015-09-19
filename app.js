/**
 * Created by Ramprakash on 9/15/15.
 */
var app = angular.module('testApp', ['checkbox-list']);

app.controller('MainCtrl', ['$scope', function($scope){
  $scope.selectedCheckboxItems = ['1'];
  $scope.selecteditemsjson = [];

  $scope.SelectionChanged = function(selecteditem){
      $scope.selecteditemsjson.push(selecteditem);
        alert(selecteditem.name);
  }

}]);