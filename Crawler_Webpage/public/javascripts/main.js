// Wait til page load before running JS
$(document).ready(function () {
    // declare the buttons as variables from the index.html page
    var red_on = $("#red_on");
    var red_off = $("#red_off");
    var red_status = $("#red_status");
    var green_on = $("#green_on");
    var green_off = $("#green_off");
    var green_status = $("#green_status");
    var blue_on = $("#blue_on");
    var blue_off = $("#blue_off");
    var blue_status = $("#blue_status");
    var yellow_on = $("#yellow_on");
    var yellow_off = $("#yellow_off");
    var yellow_status = $("#yellow_status");

    // Function to change the status of the light
    function change_led(event) {
        if(event.data.state){
            // Go to the route on the server that is designed to return change the led
            console.log('Trying to turn LED on');
            $.get('/led_on/'+event.data.color, function(data) {
                data = parseInt(data);
                if(data > 0) { 
                    console.log('LED On worked');
                } else {
                    console.log('LED ON did not worked');
                }
            });
        } else {
            console.log('Trying to turn LED off');
            $.get('/led_off/'+event.data.color, function(data) {
                if(data > 0) {
                    console.log('LED OFF worked');
                } else {
                    console.log('LED OFF did not worked');
                }
            });
        }
        
    }

    // Function to change the status of the light
    function get_led_status(event) {
        $.get('/get_status/'+event.data.color, function(data) {
            console.log('Trying to get LED status...');
            data = parseInt(data);
            console.log(data);
            var ID = event.data.color + 'Rx';
            if(data > 0) { 
                $("#"+ID).html("It's On");
            } else {
                $("#"+ID).html("It's off");
            }
        });
    }

    // On buttons, when clicked, will run the change_led function
    red_on.click({color: 'red', state: 1}, change_led);
    green_on.click({color: 'green', state: 1}, change_led);
    blue_on.click({color: 'blue', state: 1}, change_led);
    yellow_on.click({color: 'yellow', state: 1}, change_led);
    
    // Off buttons, when clicked, will run the change_led function
    red_off.click({color: 'red', state: 0}, change_led);
    green_off.click({color: 'green', state: 0}, change_led);
    blue_off.click({color: 'blue', state: 0}, change_led);
    yellow_off.click({color: 'yellow', state: 0}, change_led);
    
    // Get Status buttons, when clicked, will run the get_led_status function
    red_status.click({color: 'red'}, get_led_status);
    green_status.click({color: 'green'}, get_led_status);
    blue_status.click({color: 'blue'}, get_led_status);
    yellow_status.click({color: 'yellow'}, get_led_status);


});