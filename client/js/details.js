angular.module(
    "details", []
)
    .controller(
        'detailCtrl',
        function ($scope, $http) {
            const locationName = window.location.pathname.split("/");
            $http.get("/products/" + locationName[locationName.length - 1]).then(function (response) {
                $scope.appli = response.data[0];
                if (typeof $scope.appli.download[0] !== "undefined") {
                    $scope.appli.download[0] = "/download/" + $scope.appli.download[0];
                }
            })
        }
    );