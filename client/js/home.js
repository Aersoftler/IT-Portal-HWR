const detailUrl = "/details";
const desktopUrl = "/desktopApp";
const mobileAppUrl = "/mobileApp";
const embeddedAppUrl = "/embeddedApp";
const websiteUrl = "/website";
const detailDesktopAppUrl = detailUrl + desktopUrl;
const detailMobileAppUrl = detailUrl + mobileAppUrl;
const detailEmbeddedAppUrl = detailUrl + embeddedAppUrl;
const detailWebsiteUrl = detailUrl + websiteUrl;

//Wird aufgerufen, wenn die Seite fertig geladen hat
window.onload = function () {
    load();
    showHeader();
    showFooter();
};

//Wird aufgerufen, wenn sich die Auflösung der Seite verändert hat
window.onresize = function () {
    load();
};

//Wird genutzt, um die Seite korrekt anzuzeigen
function load() {
    const width = window.innerWidth;
    for (let i = 0; i < 4; i++) {
        const itemId = "item" + i;
        document.getElementById(itemId).style.height = (width / 5) < 200 ? "200px" : (width / 5) + "px";
    }
}

module = angular.module("home", []);

module.controller(
    'carrouselCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length - 1)];
            $scope.mobileApp = {
                "name": app.name,
                "url": detailMobileAppUrl + '/' + app.name,
                "logo": detailMobileAppUrl + '/' + app.logo
            };
        });
        $http.post('/desktopApp').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length - 1)];
            console.log(app.name);
            $scope.desktopApp = {
                "name": app.name,
                "url": detailDesktopAppUrl + '/' + app.name,
                "logo": detailDesktopAppUrl + '/' + app.logo
            };
        });
        $http.post('/embeddedApp').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length - 1)];
            $scope.embeddedApp = {
                "name": app.name,
                "url": detailEmbeddedAppUrl + '/' + app.name,
                "logo": detailEmbeddedAppUrl + '/' + app.logo
            };
        });
        $http.post('/website').then(function (response) {
            const applications = response.data;
            const app = applications[Math.floor(Math.random() * applications.length - 1)];
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