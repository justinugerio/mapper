
// main start function
$(function () {

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


});
