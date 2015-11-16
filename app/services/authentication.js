'use strict';

(function () {

    angular.module('app')
    .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'CONFIG_INFO'];

    function authenticationService($http, $cookieStore, $rootScope, $timeout, CONFIG_INFO) {

        var service = {
            signIn: signIn,
            signOut: signOut,
            clearCredentials: clearCredentials,
            setCredentials: setCredentials
        };

        return service;

        function signIn(username, password) {

            return $http({
                method: 'POST',
                url: CONFIG_INFO.baseUrl + 'Login/Authenticate',
                data: $.param({ username: username, password: password }),
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };


        function clearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        function setCredentials(username, password) {

            $rootScope.globals = {
                currentUser: {
                    username: username
                }
            };

            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('globals', $rootScope.globals);
        };

        function signOut() {

            var url = 'http://localhost/Social.Chat/services/agents/disconnect?id='
             + $rootScope.globals.socialUserData.ID;

            return $http({
                method: 'POST',
                url: url,
                headers:
                {
                    'socialToken': $rootScope.globals.socialToken
                }
            });
        };

    }
}());
