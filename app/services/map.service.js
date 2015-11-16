'use strict';

(function () {

    angular.module('app')

    .factory('mapService', mapService);

    mapService.$inject = ['$http'];

    function mapService($http) {

        var service = {
            setIncidentOnMap : setIncidentOnMap
        };

        return service;

        // --> Service functions

        function setIncidentOnMap(incident) {
            deleteMarkers();
            var latitude = incident.dmLatitud;
            var longitude = incident.dmLongitud;
            var myLatLng = { lat: latitude, lng: longitude };
            map.setZoom(13);
            map.setCenter(new google.maps.LatLng(latitude, longitude));
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Incidente ' + incident.NroIncidente
            });
            markers.push(marker);
        }

        // --> Private functions

        function deleteMarkers() {
            clearMarkers();
            markers = [];
        }

        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function clearMarkers() {
            setMapOnAll(null);
        }

    }



}());