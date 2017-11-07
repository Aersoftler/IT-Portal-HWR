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

        $http.get('/allProducts').then(function (response) {
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