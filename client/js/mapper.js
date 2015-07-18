
// main start function
$(function () {

    /*
    console.log('hello there!');

    d3.select('#mapper-panel-body-id').append('div')
        .style('border', '1px black solid')
        .html('hello world');

    d3.select('#mapper-panel-body-id').select('div')
        .style('background-color', 'orange')
        .style('font-size', '24px')
        .attr('id', 'newDiv')
        .attr('class', 'd3div')
        .on('click', function () {
            console.log('you click on a div!!!');
        })

    d3.select('svg')
        .append('line')
        .attr('x1', 20)
        .attr('y1', 20)
        .attr('x2', 400)
        .attr('y2', 400)
        .style('stroke', 'black')
        .style('stoke-width', '2px');
     */



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

/*
    createMap = function (countries) {
    var aProjection = d3.geo.mercator();
    var geoPath = d3.geo.path().projection(aProjection);

    d3.select('svg').selectAll('path').data(countries.features)
    .enter()
    .append('path')
    .attr('d', geoPath)
    .attr('class', 'countries');
    };

     d3.json('world.json', function (error, data) {
     console.log(error, data);
     });
*/


});
