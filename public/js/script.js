//alert("working");

//making the img clickable
$(document).ready(function() {
    $("#img").on("click", handleGetInfo);
    function handleGetInfo(evt){ 
    alert("You clicked the img"); 
    };

});