module = angular.module("home", []);

module.controller(
    'carouselCtrl',
    function ($scope, $http) {
        let carouselApps = [];

        function buildCarrouselScope(response) {
            const applications = response.data;
            if (response.data.length > 0) {
                const app = applications[Math.floor(Math.random() * applications.length)];
                carouselApps.push({
                    "name": app.name,
                    "url": detailUrl + "/" + app.name,
                    "logo": buildLogoUrl(app)
                });
            } else {
                carouselApps.push({});
            }
        }

        $http.get('/mobileApp').then(function (response) {
            buildCarrouselScope(response, detailMobileAppUrl);
        });
        $http.get('/desktopApp').then(function (response) {
            buildCarrouselScope(response, detailDesktopAppUrl);
        });
        $http.get('/embeddedApp').then(function (response) {
            buildCarrouselScope(response, detailEmbeddedAppUrl);
        });
        $http.get('/website').then(function (response) {
            buildCarrouselScope(response, detailWebsiteUrl);
        });
        $scope.carouselApps = carouselApps;
    }
);

function buildUeberblickScope(response, $scope) {
    if (response.data.length > 0) {
        $scope.apps = response.data;
        for (let i in response.data) {
            $scope.apps[i].url = detailUrl + '/' + response.data[i].name;
        }
    } else {
        $scope.apps = [];
    }
}

module.controller(
    'desktopAppCtrl',
    function ($scope, $http) {
        $http.get('/desktopApp').then(function (response) {
            buildUeberblickScope(response, $scope);
        })
    }
);

module.controller(
    'mobileAppCtrl',
    function ($scope, $http) {
        $http.get('/mobileApp').then(function (response) {
            buildUeberblickScope(response, $scope);
        })
    }
);

module.controller(
    'embeddedAppCtrl',
    function ($scope, $http) {
        $http.get('/embeddedApp').then(function (response) {
            buildUeberblickScope(response, $scope);
        })
    }
);

module.controller(
    'websiteCtrl',
    function ($scope, $http) {
        $http.get('/website').then(function (response) {
            buildUeberblickScope(response, $scope);
        })
    }
);