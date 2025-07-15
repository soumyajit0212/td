/**
 * 
 */

$( function() {
    $.datepicker.setDefaults({
        onClose:function(date, inst){
            $("#selectedDateVal").html(date);
        }
    });

    $( "#datepicker" ).datepicker();
});