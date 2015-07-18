
// main start function
$(function () {

/*
    d3.select('svg')
        .append('circle')
        .attr('r', 20)
        .attr('cx', 20)
        .attr('cy', 20)
        .style('fill', 'red');

    d3.select('svg')
        .append('text')
        .attr('x', 20)
        .attr('y', 20)
        .text('Hello there!!!')
        .style('opacity', 0)
        .attr('id', 'a');

    d3.select('svg')
        .append('circle')
        .attr('r', 100)
        .attr('cx', 400)
        .attr('cy', 400)
        .style('fill', 'lightblue');

    d3.select('svg')
        .append('text')
        .attr('x', 400)
        .attr('y', 400)
        .text('Uh, hi!!!')
        .attr('id', 'b')
        .style('opacity', 0);

    d3.select('#a').transition().delay(1000).style('opacity', 1);
    d3.select('#b').transition().delay(4000).style('opacity', 0.75);

    d3.selectAll('circle').transition().duration(3000).attr('cy', 200);


     d3.csv('cities.csv', function (d) {
        console.log(d);
     });
*/

    var createMap = function (countries) {      // create map handler for getJSON call
        //var aProjection = d3.geo.albersUsa();
        var aProjection = d3.geo.mercator().scale(100);
        var geoPath = d3.geo.path().projection(aProjection);

        d3.select('svg').selectAll('path').data(countries.features)
            .enter()
            .append('path')
            .attr('d', geoPath)
            .attr('class', 'countries');
    };

    $.getJSON('world.geojson', createMap);  // asynchronous call to get data in world.geojson

});
