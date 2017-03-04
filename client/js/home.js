let detailUrl = "/details";
let desktopAppUrl = detailUrl + "/desktopApp";
let mobileAppUrl = detailUrl + "/mobileApp";
let embeddedAppUrl = detailUrl + "/embeddedApp";
let websiteUrl = detailUrl + "/website";

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
    let width = window.innerWidth;
    for (let i = 0; i < 4; i++) {
        let itemId = "item" + i;
        document.getElementById(itemId).style.height = (width / 5) < 200 ? "200px" : (width / 5) + "px";
    }
}

module = angular.module("home", []);

module.controller(
    'carrouselCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            let applications = response.data;
            let app = applications[Math.floor(Math.random() * applications.length - 1)];
            $scope.mobileApp = {
                "name": app.name,
                "url": mobileAppUrl + '/' + app.name,
                "logo": mobileAppUrl + '/' + app.logo
            };
        });
        $http.post('/desktopApp').then(function (response) {
            let applications = response.data;
            let app = applications[Math.floor(Math.random() * applications.length - 1)];
            console.log(app.name);
            $scope.desktopApp = {
                "name": app.name,
                "url": desktopAppUrl + '/' + app.name,
                "logo": desktopAppUrl + '/' + app.logo
            };
        });
        $http.post('/embeddedApp').then(function (response) {
            let applications = response.data;
            let app = applications[Math.floor(Math.random() * applications.length - 1)];
            $scope.embeddedApp = {
                "name": app.name,
                "url": embeddedAppUrl + '/' + app.name,
                "logo": embeddedAppUrl + '/' + app.logo
            };
        });
        $http.post('/website').then(function (response) {
            let applications = response.data;
            let app = applications[Math.floor(Math.random() * applications.length - 1)];
            $scope.website = {
                "name": app.name,
                "url": websiteUrl + '/' + app.name,
                "logo": websiteUrl + '/' + app.logo
            };
        })
    }
);

function randomizeList(response, $scope, url) {
    let applications = response.data;
    let dataSize = applications.length - 1;
    let result = [];
    let alreadyGetted = [];
    alreadyGetted.length = dataSize + 1;
    let i = 0;
    do {
        let randomNumber = Math.floor(Math.random() * dataSize);
        if (alreadyGetted[randomNumber] == true) {
            continue;
        }
        let app = applications[randomNumber];
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
            randomizeList(response, $scope, desktopAppUrl);
        })
    }
);

module.controller(
    'mobileAppCtrl',
    function ($scope, $http) {
        $http.post('/mobileApp').then(function (response) {
            randomizeList(response, $scope, mobileAppUrl);
        })
    }
);

module.controller(
    'embeddedAppCtrl',
    function ($scope, $http) {
        $http.post('/embeddedApp').then(function (response) {
            randomizeList(response, $scope, embeddedAppUrl);
        })
    }
);

module.controller(
    'websiteCtrl',
    function ($scope, $http) {
        $http.post('/website').then(function (response) {
            randomizeList(response, $scope, websiteUrl);
        })
    }
);