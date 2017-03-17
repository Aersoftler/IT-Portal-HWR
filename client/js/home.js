module = angular.module("home", []);

module.controller(
    'carrouselCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            const applications = response.data;
            if (response.data.length > 0) {
                const app = applications[Math.floor(Math.random() * applications.length)];
                $scope.mobileApp = {
                    "name": app.name,
                    "url": detailMobileAppUrl + '/' + app.name,
                    "logo": picUrl + '/' + app.name + '/' + app.logo
                };
            }
        });
        $http.post('/desktopApp').then(function (response) {
            const applications = response.data;
            if (response.data.length > 0) {
                const number = Math.floor(Math.random() * applications.length);
                const app = applications[number];
                $scope.desktopApp = {
                    "name": app.name,
                    "url": detailDesktopAppUrl + '/' + app.name,
                    "logo": picUrl + '/' + app.name + '/' + app.logo
                };
            }
        });
        $http.post('/embeddedApp').then(function (response) {
            const applications = response.data;
            if (response.data.length > 0) {
                const app = applications[Math.floor(Math.random() * applications.length)];
                $scope.embeddedApp = {
                    "name": app.name,
                    "url": detailEmbeddedAppUrl + '/' + app.name,
                    "logo": picUrl + '/' + app.name + '/' + app.logo
                }
            }
        });
        $http.post('/website').then(function (response) {
            const applications = response.data;
            if (response.data.length > 0) {
                const app = applications[Math.floor(Math.random() * applications.length)];
                $scope.website = {
                    "name": app.name,
                    "url": detailWebsiteUrl + '/' + app.name,
                    "logo": picUrl + '/' + app.name + '/' + app.logo
                };
            }
        })
    }
);

function buildScope(response, $scope, url) {
    if (response.data.length > 0) {
        $scope.apps = response.data;
        for (let i = 0; i <= response.data.length - 1; i++) {
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
            buildScope(response, $scope, detailDesktopAppUrl);
        })
    }
);

module.controller(
    'mobileAppCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            buildScope(response, $scope, detailMobileAppUrl);
        })
    }
);

module.controller(
    'embeddedAppCtrl',
    function ($scope, $http) {
        $http.post('/embeddedApp').then(function (response) {
            buildScope(response, $scope, detailEmbeddedAppUrl);
        })
    }
);

module.controller(
    'websiteCtrl',
    function ($scope, $http) {
        $http.post('/website').then(function (response) {
            buildScope(response, $scope, detailWebsiteUrl);
        })
    }
);