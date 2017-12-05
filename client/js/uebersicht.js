module = angular.module("uebersicht", []);

module.controller(
    'resultsCtrl',
    ['$scope', '$http', '$timeout',function ($scope, $http) {
        const location = window.location.href;
        $scope.nameFilter = location.substring(location.lastIndexOf('/') + 1);
         let results = [];

        function fillScopeResults(response) {
            for (let i in response.data) {
                const app = response.data[i];
                results.push({
                    "name": app.name,
                    "kurzbeschreibung": app.kurzbeschreibung,
                    "logo": app.logo,
                    "url": detailUrl + '/' + app.name,
                    "type": app.type,
                    "zielgruppe": app.zielgruppe,
                    "jahrgang": app.jahrgang
                });
            }
        }

        $http.get('/products').then(function (response) {
            fillScopeResults(response);
        });
/*        $http.get('/desktopApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/embeddedApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/website').then(function (response) {
            fillScopeResults(response);
        });*/

        results;
        $scope.results = results;
    }
]);

module.directive('dieSuchergebnisse', function () {
    return {
        priority: 0,
        templateUrl: '/suchergebnisse.html',
        restrict: 'A'
    }
});

module.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});