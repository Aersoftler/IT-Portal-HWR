let productValues = {};

angular.module(
    "update_software", []
)
    .controller(
        'update_softwareCtrl',
        function ($scope, $http) {
            const locationName = window.location.pathname.split("/");
            $http.get("/products/" + locationName[locationName.length - 1]).then(function (response) {
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

/**
 * return current scope
 */
function getScope() {
    const appElement = document.querySelector('[ng-app=update_software]');
    return angular.element(appElement).scope();
}

/**
 * updated productValues
 * @param $scope
 */
function updateProductValues($scope) {
    productValues = $scope.appli;
}

/**
 * triggers, when an image should deleted
 * @param event
 */
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

/**
 * triggers, when a textFiled get changed
 * @param event
 */
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

/**
 * triggers, when a new logo should be added
 * @param event
 */
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

/**
 * triggers, when a screenshot should be added
 * @param event
 */
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

/**
 * triggers, when a new file should be added
 * @param event
 */
function addFile(event) {
    const reader = new FileReader();
    const path = event.value.split("\\");
    reader.filename = path[path.length - 1];
    reader.onload = function (onloadEvent) {
        const $scope = getScope();
        $scope.$apply(function () {
            $scope.appli[event.id][0] = onloadEvent.target.filename;
        });
        updateProductValues($scope);
        onloadEvent.preventDefault();
    };
    const file = event.files[0];
    reader.readAsDataURL(file);
}

/**
 * triggers, when a file should be deleted
 */
function removeDownload() {
    const shouldDelete = confirm("Soll die Datei wirklich gelöscht werden?");
    if (shouldDelete) {
        document.getElementById('download').value = "";
        const $scope = getScope();
        $scope.$apply(function () {
            $scope.appli["download"][0] = "";
            $scope.appli["file"] = undefined;
        });
        updateProductValues($scope);
    }
}

/**
 * sends the updated product
 * @param spinner
 */
function sendUpdate(spinner) {
    $.ajax({
        url: "/products/" + productValues.name,
        type: "PATCH",
        data: JSON.stringify(productValues),
        contentType: "application/json",
        cache: false,
        processData: false,
        success: function (res) {
            const $scope = getScope();
            $scope.$apply(function () {
                $scope.appli._id = res;
            });
            updateProductValues($scope);
            $("#failureAlert").css("display", "none");
            $("#successAlert").css("display", "block");
            spinner.stop();
        },
        error: function (jqXHR, textStatus, errorMessage) {
            console.log(errorMessage);
            $("#failureAlert").css("display", "block");
            $("#successAlert").css("display", "none");
            spinner.stop();
        }
    })
}

const opts = {
    lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 10 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 0.25 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '98%' // Top position relative to parent
    , left: '75%' // Left position relative to parent
    , shadow: true // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
};

/**
 * triggers, when an user clicked on save
 */
function save() {
    const target = document.getElementById('saveContainer');
    const spinner = new Spinner(opts).spin(target);

    handleEmptyLinks();

    const downloadElement = $("#download")[0];
    if (downloadElement.files[0]) {
        const reader = new FileReader();

        reader.onload = function () {
            productValues.file = reader.result;
            sendUpdate(spinner)
        };

        reader.readAsDataURL(downloadElement.files[0]);
    } else {
        sendUpdate(spinner);
    }
}

function handleEmptyLinks() {
    handleEmptyLink("website");
    handleEmptyLink("gitHub");
    handleEmptyLink("download");
}

function handleEmptyLink(attribute) {
    if (productValues[attribute][0] === "") {
        productValues[attribute] = [];
    }
}