module = angular.module("uebersicht", []);

module.controller(
    'resultsCtrl',
    function ($scope, $http) {
        const location = window.location.href;
        $scope.nameFilter = location.substring(location.lastIndexOf('/') + 1);
        let j = 0;
        $scope.results = [];
        function fillScopeResults(response, url) {
            for (let i = 0; i < response.data.length; i++, j++) {
                app = response.data[i];
                $scope.results[j] = {
                    "name": app.name,
                    "kurzbeschreibung": app.kurzbeschreibung,
                    "logo": url + '/' + app.logo,
                    "url": url + '/' + app.name
                };
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
        })
    }
);