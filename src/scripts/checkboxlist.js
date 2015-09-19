'use strict';

var cb = angular.module('checkbox-list', []);

cb.factory('listDataProvider', function(){
    var checkboxOptions = [
        { name: 'Item 1', value: 1 },
        { name: 'Item 2', value: 2}
    ];

    return {
        getList: function(name){
            if(name === 'checkboxOptions'){
                return checkboxOptions;
            } else {
                return [];
            }
        }
    };
});

cb.directive('checkboxlist', ['$compile', 'listDataProvider', function ($compile, listDataProvider) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            selecteditems: '=?',
            options: '=?',
            valueattrib: '=?',
            displayattrib: '=?'
        },
        controller: function ($scope) {
            $scope.list = '';

            $scope.setData = function (name) {
                var list = listDataProvider.getList(name);
                $scope.options = list;
            };

            $scope.setSelected = function () {
                var i;
                for (i = 0; i < $scope.selecteditems.length; i++) {
                    angular.forEach($scope.options, function (value, key, found) {
                        if (value[$scope.valueattrib] === $scope.selecteditems[i]) {
                            value.Selected = true;
                        }
                    })
                }
            };

            $scope.onChanged = function (current) {
                var item = $scope.options[current];
                var index = $scope.selecteditems.indexOf(item[$scope.valueattrib]);
                if (index > -1) {
                    $scope.selecteditems.splice(index, 1)
                } else {
                    $scope.selecteditems.push(item[$scope.valueattrib]);
                }
            };
        },
        link: function (scope, element, attrs) {
            if (!scope.options) {
                scope.valueattrib = "value";
                scope.displayattrib = "name";
                scope.list = attrs.list;
                scope.setData(scope.list);
            } else {
                scope.valueattrib = attrs.valueattrib;
                scope.displayattrib = attrs.displayattrib;
            }
            //set selected
            scope.setSelected();
        },
        templateUrl: 'src/partials/checkboxlist.html'
    };
}]);
