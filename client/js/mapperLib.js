/**
 * Created by Justin.Ugerio on 7/20/2015.
 */

// create world map
Mapper.Lib = (function () {

    // public variables
    var
        createWorldMap,
        createMapboxMap,
        hideMapperContainer;


    // create world map using d3.js
    createWorldMap = function () {

         // d3.js example of the map of the world
         var createMap = function (countries, cities) {
         var width = 500;
         var height = 500;
         var projection = d3.geo.mercator()
         .scale(110);
         var geoPath = d3.geo.path().projection(projection);

         d3.select("svg").selectAll("path").data(countries.features)
             .enter()
             .append("path")
             .attr("d", geoPath)
             .attr('class', 'countries');

         d3.select("svg").selectAll("circle").data(cities)
             .enter()
             .append("circle")
             .style("fill", "red")
             .attr("class", "cities")
             .attr("r", 3)
             .attr("cx", function (d) {
                    return projection([d.x, d.y])[0]
                })
             .attr("cy", function (d) {
                    return projection([d.x, d.y])[1]
                });
             }

         d3.csv('cities.csv', function(cities) { // async call to get data in cities.csv
         $.getJSON('world.geojson', function(countries) {    // async call to get data in world.geojson
                createMap(countries, cities);   // when both async functions return, call create Map
            });
         });

    };

    // create Mapbox map using Mapbox.js
    createMapboxMap = function () {

        L.mapbox.accessToken = 'pk.eyJ1IjoianVzdGludSIsImEiOiI3MjA5MjhmZTA0ZGMyYjMzMzE5OWQwZmZkZWE5YTU4MiJ9.voJN-SvlJY5QuW1Qj6d_Gw';
        var map = L.mapbox.map(
                'map',
                'justinu.mp37pmc7',
                {
                    legendControl: {
                        position: 'topright'
                    }
                }
            )
            .setView([33.65528965, -117.85998702], 12);

        map.legendControl.addLegend("<strong>Engineer Routes for Irvine District</strong>");

        map.dragging.disable();
        map.scrollWheelZoom.disable();


        /* *****************************************
        var featureLayer = L.mapbox.featureLayer()
            .addTo(map);

        var featureGeoJSON = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [-117.85998702, 33.65528965]   // geojson has long/lat order
                    },
                    properties: {
                        title: "Start Position",
                        'marker-size': 'large',
                        'marker-color': '#5656B1',
                        'marker-symbol': 'commercial'
                    }
                },
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [-117.90982246, 33.60325352]
                    },
                    properties: {
                        title: "Balboa Beach",
                        'marker-size': 'large',
                        'marker-color': '#05E707',
                        'marker-symbol': 'swimming'
                    }
                }
                /*
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [-117.85998702, 33.65528965],
                            [-117.90982246, 33.60325352]
                        ]
                    },
                    "properties": {
                        "stroke": "#fa946e",
                        "stroke-opacity": 1,
                        "stroke-width": 6
                    }
                }
                ////////// * /
            ]
        }

        featureLayer.setGeoJSON(featureGeoJSON);

        var polyline = L.polyline([], {color: 'red'}).addTo(map);
        var pointsAdded = 0;
        var polylinePoints = [[33.65528965, -117.85998702], [33.60325352, -117.90982246]];  // lat/long order

        var add = function () {
            polyline.addLatLng(
                polylinePoints[pointsAdded]
            );

            if (++pointsAdded < 2) {
                window.setTimeout(add, 1000);
            }

        };

        add();
        ******************************* */
    };

    // hide mapper-container div
    hideMapperContainer = function () {
        $('#mapper-container-id').addClass('hidden');
    };


    // return object /////////////////////////////////////////////////////////
    return {
        createWorldMap: createWorldMap,
        createMapboxMap: createMapboxMap,
        hideMapperContainer: hideMapperContainer
    };

})();

