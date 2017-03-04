//Wird aufgerufen, wenn die Seite fertig geladen hat
window.onload = function () {
    showFooter();
    console.log(window.location.pathname);
};

angular.module(
    "details", []
)
    .controller(
        'detailCtrl',
        function ($scope, $http) {
            $http.post(window.location.pathname).then(function (response) {
                $scope.appli = response.data[0];
            })
        }
    );