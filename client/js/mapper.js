
// Global namespace object
Mapper = {};


// main start function
$(function () {

    //Mapper.Test.createWorldMap();

    Mapper.Lib.hideMapperContainer();
    //Mapper.Lib.createMapboxMap();

    $( "#slider" ).slider({
        value: 10,
        orientation: "horizontal",
        range: "min",
        animate: true
    });

    var defaultSXP = '<SXPTaskGet Revision = "1.0.0"><Task RefType="ByProperties"><CallID>Justin-2015-06-25-02</CallID> <Number>1</Number></Task></SXPTaskGet>';

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

    sxpMessage = $.trim($('#text-area-input-id').val());

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
            response = $.trim(data.documentElement.outerHTML);
            response = formatXml(response);
            $('#text-area-output-id').val(response);
        })
        .fail(function(jqXHR, status, error) {
            errorResponse = error;
            $('#text-area-output-id').val(errorResponse);
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

