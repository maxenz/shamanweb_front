'use strict';

(function () {

    angular
        .module('app')
        .controller('OperativePanelController', OperativePanelController);

    OperativePanelController.$inject = ['$scope', 'operativeService', 'mobilesService', 'mapService'];

    function OperativePanelController($scope, operativeService, mobilesService, mapService) {

        // --> Grids configurations

        $scope.gridOperativeSettings =
        {
            width: '100%',
            theme: 'bootstrap',
            altRows : true,
            source: {
                dataType: "json",
                dataFields: [
                   { name: 'IncidenteId', type: 'string' },
                   { name: 'AbreviaturaId', type: 'string' },
                   { name: 'Cliente', type: 'string' },
                   { name: 'NroIncidente', type: 'string' },
                   { name: 'Domicilio', type: 'string' },
                   { name: 'Sintomas', type: 'string' },
                   { name: 'Localidad', type: 'string' },
                   { name: 'SexoEdad', type: 'string' },
                   { name: 'Movil', type: 'string' },
                   { name: 'horLlamada', type: 'string' },
                   { name: 'TpoDespacho', type: 'string' },
                   { name: 'TpoSalida', type: 'string' },
                   { name: 'TpoDesplazamiento', type: 'string' },
                   { name: 'TpoAtencion', type: 'string' },
                   { name: 'Paciente', type: 'string' },
                   { name: 'dmReferencia', type: 'string' }
                ],
                id: 'IncidenteId',
            },
            columnsResize: true,
            columns: [
                  { text: 'IncidenteId', dataField: 'IncidenteId', hidden: true },
                  { text: 'Gdo', datafield: 'AbreviaturaId' },
                  { text: 'Cliente', datafield: 'Cliente' },
                  { text: 'Nro', datafield: 'NroIncidente' },
                  { text: 'Domicilio', datafield: 'Domicilio' },
                  { text: 'Sintomas', datafield: 'Sintomas' },
                  { text: 'Loc', datafield: 'Localidad' },
                  { text: 'SE', datafield: 'SexoEdad' },
                  { text: 'Mov', datafield: 'Movil' },
                  { text: 'Llam', datafield: 'horLlamada' },
                  { text: 'Dsp', datafield: 'TpoDespacho' },
                  { text: 'Sal', datafield: 'TpoSalida' },
                  { text: 'Dpl', datafield: 'TpoDesplazamiento' },
                  { text: 'Ate', datafield: 'TpoAtencion' },
                  { text: 'Paciente', datafield: 'Paciente' },
                  { text: 'Ref', datafield: 'dmReferencia' }
            ]
        };

        $scope.gridMobileSettings =
        {
            width: '100%',
            theme: 'bootstrap',
            altRows : true,
            source: {
                datatype: "json",
                datafields:
                [
                    { name: 'Movil', type: 'string' },
                    { name: 'ZonaGeograficaId', type: 'string' },
                    { name: 'ValorGrilla', type: 'string' }
                ],
                id: 'ID',
            },
            columnsResize: true,
            columns: [
              { text: 'Mov', datafield: 'Movil' },
              { text: 'Zona', datafield: 'ZonaGeograficaId' },
              { text: 'Est', datafield: 'ValorGrilla' }

            ]
        };

        $scope.selectIncident = function (event) {
            operativeService.getIncident(event.args.key).then(function (incident) {
                $scope.incident = incident.data;
                console.log(incident);
                mapService.setIncidentOnMap($scope.incident);
            });
        }

/*        operativeService.getChartsData().then(function (charts) {
            console.log(charts.data);
            $scope.chartDistributionServicesLabels = charts.data.QuantityChartDescriptions;
            $scope.chartDistributionServiceValues = charts.data.QuantityChartQuantities;
            $scope.chartOperativeTimesLabels = charts.data.TimeChartDescriptions;
            $scope.chartOperativeTimesValues = charts.data.TimeChartValues;
        });*/

        operativeService.getOperativeData().then(function(res){
            $scope.gridOperativeSettings.source.localdata = res.incidents.data;
        })

        $scope.sexList = ['M', 'F'];

        $scope.selectSex = function (sex) {
            $scope.incident.Sexo = sex;
        }

        $scope.status = {
            opened: false
        };

        $scope.dateFormat = 'dd-MM-yyyy';

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };
        $scope.minDate = $scope.minDate ? null : new Date();
        $scope.maxDate = new Date(2020, 5, 22);


        // --> Funciones genericas, seran puestas en un general luego
        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }



        // --> Reception tab functions

        $scope.firstIncident = function () {
            operativeService
                .getFirstIncident($scope.incident.IncidenteId)
                .then(function (incident) {
                    $scope.incident = {};
                    $scope.incident = incident.data;
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.nextIncident = function () {
            operativeService
                .getNextIncident($scope.incident.IncidenteId)
                .then(function (incident) {
                    $scope.incident = {};
                    $scope.incident = incident.data;
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.previousIncident = function () {
            operativeService
                .getPreviousIncident($scope.incident.IncidenteId)
                .then(function (incident) {
                    $scope.incident = {};
                    $scope.incident = incident.data;
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.lastIncident = function () {
            operativeService
                .getLastIncident($scope.incident.IncidenteId)
                .then(function (incident) {
                    $scope.incident = {};
                    $scope.incident = incident.data;
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.saveIncident = function () {
            console.log($scope.incident);
        }


        $scope.newIncident = function () {
            $scope.incident = {};
        }

    }




}());

