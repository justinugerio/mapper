
// Global namespace object
Mapper = {};


// main start function
$(function () {

    //Mapper.Test.createWorldMap();

    Mapper.Lib.hideMapperContainer();
    Mapper.Lib.createMapboxMap();

    $( "#slider" ).slider({
        value: 10,
        orientation: "horizontal",
        range: "min",
        animate: true
    });

});
