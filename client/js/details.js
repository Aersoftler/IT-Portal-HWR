angular.module(
    "details", []
)
    .controller(
        'detailCtrl',
        function ($scope, $http) {
            $http.post(window.location.pathname).then(function (response) {
                $scope.appli = response.data[0];
                $scope.appli.logo = '\\pic\\' + $scope.appli.name + '\\' + $scope.appli.logo;
                for (let i = 0; i <= response.data[0].screenshots.length - 1; i++) {
                    $scope.appli.screenshots[i] = '\\pic\\' + $scope.appli.name + '\\' + $scope.appli.screenshots[i];
                }
                if ($scope.appli.download.length > 0) {
                    $scope.appli.download[0] = '\\download\\' + $scope.appli.download[0];
                }
            })
        }
    );