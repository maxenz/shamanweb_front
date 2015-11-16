'use strict';

(function () {

    angular.module('app')

    .factory('operativeService', operativeService);

    operativeService.$inject = ['$http', '$q'];

    function operativeService($http, $q) {

        var service = {
            getIncidents        : getIncidents,
            getChartsData       : getChartsData,
            getIncident         : getIncident,
            getFirstIncident    : getFirstIncident,
            getPreviousIncident : getPreviousIncident,
            getNextIncident     : getNextIncident,
            getLastIncident     : getLastIncident,
            getOperativeData    : getOperativeData
        };

        service.incidents = [];

        return service;

        function getIncidents() {
            return $http.get('Operative/GetIncidents');

        };

        function getOperativeData() {
            var promises = {
                incidents: getPromise('Operative/GetIncidents')
                //mobiles: getPromise('Operative/GetMobiles')
            }

            var deferred = $q.defer();

            $q.all(promises)
            .then(function (results) {
                deferred.resolve(results);
            },
            function (errors) {
                deferred.reject(errors);
            });

            return deferred.promise;
        }

        function getChartsData() {
            return $http.get('Operative/GetChartsData');
        };

        function getIncident(incidentId) {
            return $http.get('Operative/GetIncident/' + incidentId);
        };

        function getFirstIncident(incidentId) {
            return $http.get('Operative/GetFirstIncident/' + incidentId);
        }

        function getPreviousIncident(incidentId) {
            return $http.get('Operative/GetPreviousIncident/' + incidentId);
        }

        function getNextIncident(incidentId) {
            return $http.get('Operative/GetNextIncident/' + incidentId);
        }

        function getLastIncident(incidentId) {
            return $http.get('Operative/GetLastIncident/' + incidentId);
        }

        function getPromise(url) {
            return $http.get(url);
        }
    }



}());