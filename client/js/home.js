module = angular.module("home", []);

module.controller(
    'carouselCtrl',
    function ($scope, $http) {
        let carouselApps = [];

        function buildCarrouselScope(response, url) {
            const applications = response.data;
            if (response.data.length > 0) {
                const app = applications[Math.floor(Math.random() * applications.length)];
                carouselApps.push({
                    "name": app.name,
                    "url": url + '/' + app.name,
                    "logo": buildLogoUrl(app)
                });
            } else {
                carouselApps.push({});
            }
        }

        $http.post('/mobileApp').then(function (response) {
            buildCarrouselScope(response, detailMobileAppUrl);
        });
        $http.post('/desktopApp').then(function (response) {
            buildCarrouselScope(response, detailDesktopAppUrl);
        });
        $http.post('/embeddedApp').then(function (response) {
            buildCarrouselScope(response, detailEmbeddedAppUrl);
        });
        $http.post('/website').then(function (response) {
            buildCarrouselScope(response, detailWebsiteUrl);
        });
        $scope.carouselApps = carouselApps;
    }
);

function buildUeberblickScope(response, $scope, url) {
    if (response.data.length > 0) {
        $scope.apps = response.data;
        for (let i in response.data) {
            $scope.apps[i].url = url + '/' + response.data[i].name;
        }
    } else {
        $scope.apps = [];
    }
}

module.controller(
    'desktopAppCtrl',
    function ($scope, $http) {
        $http.post('/desktopApp').then(function (response) {
            buildUeberblickScope(response, $scope, detailDesktopAppUrl);
        })
    }
);

module.controller(
    'mobileAppCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            buildUeberblickScope(response, $scope, detailMobileAppUrl);
        })
    }
);

module.controller(
    'embeddedAppCtrl',
    function ($scope, $http) {
        $http.post('/embeddedApp').then(function (response) {
            buildUeberblickScope(response, $scope, detailEmbeddedAppUrl);
        })
    }
);

module.controller(
    'websiteCtrl',
    function ($scope, $http) {
        $http.post('/website').then(function (response) {
            buildUeberblickScope(response, $scope, detailWebsiteUrl);
        })
    }
);