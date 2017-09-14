let productValues = {};

angular.module(
    "update_software", []
)
    .controller(
        'update_softwareCtrl',
        function ($scope, $http) {
            const locationName = window.location.pathname.split("/");
            $http.get("/software/" + locationName[locationName.length - 1]).then(function (response) {
                $scope.appli = response.data[0];
                productValues = response.data[0];
                if ($scope.appli.gitHub.length === 0) {
                    $scope.appli.gitHub[0] = ""
                }
                if ($scope.appli.website.length === 0) {
                    $scope.appli.website[0] = ""
                }
                if ($scope.appli.download.length === 0) {
                    $scope.appli.download[0] = ""
                }
            });
        }
    );

function getScope() {
    const appElement = document.querySelector('[ng-app=update_software]');
    return angular.element(appElement).scope();
}

function updateProductValues($scope) {
    productValues = $scope.appli;
}

function deleteImage(event) {
    const shouldDelete = confirm("Soll das Bild wirklich gelöscht werden?");
    if (shouldDelete) {
        const $scope = getScope();
        $scope.$apply(function () {
            $scope.appli.screenshots.splice($scope.appli.screenshots.indexOf(event.target.src), 1);
        });
        updateProductValues($scope);
    }
}

function textFieldChanged(event) {
    const $scope = getScope();
    if (typeof $scope.appli[event.id] === "object") {
        $scope.$apply(function () {
            $scope.appli[event.id][0] = event.value;
        });
    } else {
        $scope.$apply(function () {
            $scope.appli[event.id] = event.value;
        });
    }
    updateProductValues($scope);
}

function addLogo(event) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const $scope = getScope();
        $scope.$apply(function () {
            $scope.appli["logo"] = event.target.result;
        });
        updateProductValues($scope)
    };
    reader.readAsDataURL(event.files[0]);
}

function addScreenshot(event) {
    for (let i = 0; i < event.files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const $scope = getScope();
            $scope.$apply(function () {
                $scope.appli["screenshots"].push(event.target.result);
            });
            updateProductValues($scope)
        };
        const file = event.files[i];
        reader.readAsDataURL(file);
    }
}