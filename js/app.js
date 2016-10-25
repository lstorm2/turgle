
$(document).ready(function() {
    $("#c0").html("foo");
    $(".image").click(function() {
        alert($(this).attr("id")) 
    });
});
