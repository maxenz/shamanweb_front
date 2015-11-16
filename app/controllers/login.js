'use strict';

(function () {
    angular.module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$location', 'authenticationService'];

    function LoginController($scope, $rootScope, $location, authenticationService) {

        authenticationService.clearCredentials();

        $scope.loginUser = function () {
            $scope.dataLoading = true;
            authenticationService.signIn($scope.UserName, $scope.Password)
                .success(function (agent) {
                    authenticationService.setCredentials($scope.UserName, $scope.Password);
                    $location.path('/');
                })
                .error(function (error) {
                    $scope.error = error.Message;
                    $scope.dataLoading = false;
                });
        };
    }

}());