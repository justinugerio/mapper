
// Global namespace object
Mapper = {};

Mapper.sliderTick = 100;    // delay for slider
Mapper.sxpDelay = 1000; // delay for SXP response
Mapper.sliderState = null;

// main start function
$(function () {

    //Mapper.Test.createWorldMap();

    Mapper.Lib.hideMapperContainer();
    //Mapper.Lib.createMapboxMap();

    $( "#slider" ).slider({
        value: 0,
        orientation: "horizontal",
        range: "min",
        animate: true
    });

    $('#control-button').click(moveSlider);

    //var defaultSXP = '<SXPTaskGet Revision = "1.0.0"><Task RefType="ByProperties"><CallID>Justin-2015-06-25-02</CallID> <Number>1</Number></Task></SXPTaskGet>';
    var defaultSXP = '<SXPEngineerGetSchedule Revision="7.5.0"><Engineer><ID>Justin.Ugerio</ID><District>MONROVIA FIELD LOCATION</District></Engineer><TimeInterval><Start>2015-07-28T6:00:00</Start><Finish>2015-07-28T18:00:00</Finish></TimeInterval><WithNA>true</WithNA></SXPEngineerGetSchedule>';

    defaultSXP = formatXml(defaultSXP);
    $('#text-area-input-id').val(defaultSXP);
    $('#form-button-id').click(callAjaxSXP);

});


//////// In order to get CORS working with IIS, I had to do the following:
//////// 1.  In IIS, enable "Anonymous Authentication" on both the "SO" and "SO/IntegrationServices" virtual directories
//////// 2.  Under the "SO" virtual directory, go to "HTTP Response Headers" and add "Access-Control-Allow-Origin=*" and "Access-Control-Allow-Headers=Content-Type"
//////// 3.  Under the "SO/IntegrationServices" virtual directory, verify that the two response headers from Step 2 exist
var callAjaxSXP = function() {

    var ajaxURL = 'http://vmscecsbudev52/SO/IntegrationServices/sxpint.aspx';
    var sxpMessage;
    var response = '';
    var errorResponse = '';
    var delay = Mapper.sxpDelay;   // delay to receive SXP response

    sxpMessage = $.trim($('#text-area-input-id').val());

    $('#form-button-id i').removeClass('fa-cog').addClass('fa-spinner fa-pulse');

    $.ajax(
        {
            type: 'POST',
            url: ajaxURL,
            data: sxpMessage,
            contentType: 'text/xml',    // content type for post request data
            dataType: 'xml'     // content type for response data
        }
    )
        .done(function (data) {
            setTimeout(function () {
                response = $.trim(data.documentElement.outerHTML);
                response = formatXml(response);
                $('#text-area-output-id').val(response);
            }, delay);   // add delay
        })
        .fail(function(jqXHR, status, error) {
            setTimeout(function () {
                errorResponse = error;
                $('#text-area-output-id').val(errorResponse);
            }, delay);   // add delay
        })
        .always(function(jqXHR, status, error) {
            setTimeout(function () {
                $('#form-button-id i').removeClass('fa-spinner fa-pulse').addClass('fa-cog');
            }, delay);   // add delay
        });
};

// format XML with indentation
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    $.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}


// automatically move slider when user clicks on Start button
var moveSlider = function() {

    var value = 0;

    $('#control-button i').removeClass('fa-car').addClass('fa-refresh fa-spin');

    if (Mapper.sliderState == null) {
        Mapper.sliderState = 'active';
        setTimeout(addTick, Mapper.sliderTick);   // call recursive function until slider reaches max
    }

};

// recursive function to move slider
var addTick = function () {
    var value = $('#slider').slider('value');

    value = value + 1;
    $('#slider').slider('value', value);

    if (value >= 100) {
        $('#control-button i').removeClass('fa-refresh fa-spin').addClass('fa-car');    // done
        Mapper.sliderState = null;
    }
    else {
        setTimeout(addTick, Mapper.sliderTick);   // recursive call for next tick
    }
};