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