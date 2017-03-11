module = angular.module("home", []);

module.controller(
    'carrouselCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length)];
            $scope.mobileApp = {
                "name": app.name,
                "url": detailMobileAppUrl + '/' + app.name,
                "logo": detailMobileAppUrl + '/' + app.logo
            };
        });
        $http.post('/desktopApp').then(function (response) {
            const applications = response.data;
            const number = Math.floor(Math.random() * applications.length);
            const app = applications[number];
            $scope.desktopApp = {
                "name": app.name,
                "url": detailDesktopAppUrl + '/' + app.name,
                "logo": detailDesktopAppUrl + '/' + app.logo
            };
        });
        $http.post('/embeddedApp').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length)];
            $scope.embeddedApp = {
                "name": app.name,
                "url": detailEmbeddedAppUrl + '/' + app.name,
                "logo": detailEmbeddedAppUrl + '/' + app.logo
            };
        });
        $http.post('/website').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length)];
            $scope.website = {
                "name": app.name,
                "url": detailWebsiteUrl + '/' + app.name,
                "logo": detailWebsiteUrl + '/' + app.logo
            };
        })
    }
);

function randomizeList(response, $scope, url) {
    const applications = response.data;
    const dataSize = applications.length - 1;
    const result = [];
    const alreadyGetted = [];
    alreadyGetted.length = dataSize + 1;
    let i = 0;
    do {
        const randomNumber = Math.floor(Math.random() * dataSize);
        if (alreadyGetted[randomNumber] == true) {
            continue;
        }
        const app = applications[randomNumber];
        result.push({
            "name": app.name,
            "url": url + '/' + app.name
        });
        alreadyGetted[randomNumber] = true;
        i++;
    } while (i < 3);
    $scope.apps = result;
}
module.controller(
    'desktopAppCtrl',
    function ($scope, $http) {
        $http.post('/desktopApp').then(function (response) {
            randomizeList(response, $scope, detailDesktopAppUrl);
        })
    }
);

module.controller(
    'mobileAppCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            randomizeList(response, $scope, detailMobileAppUrl);
        })
    }
);

module.controller(
    'embeddedAppCtrl',
    function ($scope, $http) {
        $http.post('/embeddedApp').then(function (response) {
            randomizeList(response, $scope, detailEmbeddedAppUrl);
        })
    }
);

module.controller(
    'websiteCtrl',
    function ($scope, $http) {
        $http.post('/website').then(function (response) {
            randomizeList(response, $scope, detailWebsiteUrl);
        })
    }
);