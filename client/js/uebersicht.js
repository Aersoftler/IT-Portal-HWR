module = angular.module("uebersicht", []);

module.controller(
    'resultsCtrl',
    function ($scope, $http) {
        const location = window.location.href;
        $scope.nameFilter = location.substring(location.lastIndexOf('/') + 1);
        let results = [];
        function fillScopeResults(response, url) {
            for (let i in response.data) {
                app = response.data[i];
                results.push({
                    "name": app.name,
                    "kurzbeschreibung": app.kurzbeschreibung,
                    "logo": buildLogoUrl(app),
                    "url": url + '/' + app.name
                });
            }
        }

        $http.post('/mobileApp').then(function (response) {
            fillScopeResults(response, detailMobileAppUrl);
        });
        $http.post('/desktopApp').then(function (response) {
            fillScopeResults(response, detailDesktopAppUrl);
        });
        $http.post('/embeddedApp').then(function (response) {
            fillScopeResults(response, detailEmbeddedAppUrl);
        });
        $http.post('/website').then(function (response) {
            fillScopeResults(response, detailWebsiteUrl);
        });
        $scope.results = results;
    }
);

module.directive('dieSuchergebnisse', function () {
    return {
        priority: 0,
        templateUrl: '/suchergebnisse',
        restrict: 'A'
    }
});