/**
 * Created by Ramprakash on 9/14/15.
 */
angular.module('rpg.Checkboxlist', [])
    .directive('rpgCheckboxlist', [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                selecteditems: '=?',
                options: '=?',
                displayattrib: '=?',
                valueattrib: '=?'
            },
            controller: function ($scope) {

                $scope.onChanged = function (current) {
                    var item = $scope.options[current];
                    var index = $scope.selecteditems.indexOf(item.value);
                    if (index > -1) {
                        $scope.selecteditems.splice(index, 1)
                    } else {
                        $scope.selecteditems.push(item.value);
                    }
                }
            },
            link: function (scope, element, attrs) {

            },
            templateUrl: function (elem, attrs) {
                if (attrs.templateurl) {
                    return attrs.templateurl;
                }
            }
        };
    }]);
