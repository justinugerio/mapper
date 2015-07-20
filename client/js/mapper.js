
// main start function
$(function () {

    // mapbox.js example
    L.mapbox.accessToken = 'pk.eyJ1IjoianVzdGludSIsImEiOiI3MjA5MjhmZTA0ZGMyYjMzMzE5OWQwZmZkZWE5YTU4MiJ9.voJN-SvlJY5QuW1Qj6d_Gw';
    var map = L.mapbox.map('map', 'justinu.moonmnfj'); // '' or 'mapbox.streets'
        //.setView([33.7, -117.8], 15);


    /*
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
    */

});
