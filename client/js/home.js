let detailUrl = "/details";
let desktopAppUrl = detailUrl + "/desktopApp";

//Wird aufgerufen, wenn die Seite fertig geladen hat
window.onload = function () {
    load();
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

angular.module(
    "home", []
)
    .controller(
        'desktopAppCtrl',
        function ($scope, $http) {
            $http.post('/desktopApp').then(function (response) {
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
                        "url": desktopAppUrl + '/' + app.name
                    });
                    alreadyGetted[randomNumber] = true;
                    i++;
                } while (i < 3);
                $scope.apps = result;
            })
        }
    );