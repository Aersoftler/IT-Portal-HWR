module = angular.module("uebersicht", []);

module.controller(
    'resultsCtrl',
    function ($scope, $http) {
        const location = window.location.href;
        $scope.nameFilter = location.substring(location.lastIndexOf('/') + 1);
        let results = [];

        function fillScopeResults(response) {
            for (let i in response.data) {
                app = response.data[i];
                results.push({
                    "name": app.name,
                    "kurzbeschreibung": app.kurzbeschreibung,
                    "logo": buildLogoUrl(app),
                    "url": detailUrl + '/' + app.name
                });
            }
        }

        $http.get('/mobileApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/desktopApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/embeddedApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/website').then(function (response) {
            fillScopeResults(response);
        });
        $scope.results = results;
    }
);

module.directive('dieSuchergebnisse', function () {
    return {
        priority: 0,
        templateUrl: '/suchergebnisse.html',
        restrict: 'A'
    }
});