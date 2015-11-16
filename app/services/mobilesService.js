'use strict';

(function () {
    angular.module('app')

    .factory('mobilesService', mobilesService);

    mobilesService.$inject = ['$http'];

    function mobilesService($http) {
        var service = {
            getMobiles: getMobiles
        };

        service.mobiles = [];

        return service;

        function getMobiles() {
            return $http.get('api/mobiles');
        }
    }

}());