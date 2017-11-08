module = angular.module("uebersicht", []);

module.controller(
    'resultsCtrl',
    function ($scope, $http) {
        const location = window.location.href;
        $scope.nameFilter = location.substring(location.lastIndexOf('/') + 1);
        let results = [];

        function fillScopeResults(response) {
            for (let i in response.data) {
                const app = response.data[i];
                results.push({
                    "name": app.name,
                    "kurzbeschreibung": app.kurzbeschreibung,
                    "logo": app.logo,
                    "url": updateUrl + '/' + app.name
                });
            }
        }

        $http.get('/mobileApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/desktopApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/embeddedApp').then(function (response) {
            fillScopeResults(response);
        });
        $http.get('/website').then(function (response) {
            fillScopeResults(response);
        });
        $scope.results = results;
    }
);

function deleteSoftware(event) {
    const shouldDelete = confirm("Soll die Software wirklich gelöscht werden?");
    if (shouldDelete) {
        $.ajax({
            url: "/" + event.dataset.name,
            type: "DELETE",
            success: function () {
                location.reload();
            },
            error: function (jqXHR, textStatus, errorMessage) {
                alert("Es ist ein Fehler aufgetreten. Bitte später erneut versuchen!");
            }
        })
    }
}