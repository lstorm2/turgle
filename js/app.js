/* provides the layout of each screen */
$main_screen = $([
   "<div id='main_image'>",
   "    <div class='image' id='main'>",
   "        <img src='' />  ",
   "        <p></p>",
   "    </div>",
   "</div>",
   "<div class='prompt'>",
   "    <p></p>",
   "</div>",
   "<div class='image option' id='iA'>",
   "    <img src='' />",
   "    <p></p>",
   "</div>",
   "<div class='image option' id='iB'>",
   "    <img src='' />",
   "    <p></p>",
   "</div>",
   "<div class='image option' id='iC'>",
   "    <img src='' />",
   "    <p></p>",
   "</div>"
].join("\n"));

$result_screen = $([
   "<div id='main_image'>",
   "    <div class='image' id='main'>",
   "        <img src='' />  ",
   "        <p></p>",
   "    </div>",
   "</div>"
].join("\n"));

$final_screen = $([
   "<div class='prompt'>",
   "    <p></p>",
   "</div>",
].join("\n"));

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function getJsonObject(data, key, val) {
    var i, len = data.length;
    for (i = 0; i < len; i++) {
        if (data[i] && data[i].hasOwnProperty(key)) {
            if (data[i][key] == val)
                return data[i];
        }
    }
    return -1;
}

function loadScreen(option, json) {
    var path = json.images.path;
    option = option.replace(path, "");
    var screen = getJsonObject(json.screens.screen, "main", option);
    if (screen == -1) {
        /* load the result screen */
        $("#wrapper").empty().append($result_screen);
        option = option.splice(option.length - 4, 0, "end");
        $("#main_image img").attr("src", path + option);
        var caption = getJsonObject(json.images.image, "name", option).caption;
        $("#main_image p").text(caption);
        $("#main_image img").click(function() {
            var success = getJsonObject(json.images.image, "success", "true");
            $("#wrapper").empty().append($final_screen);
            var msg = (success == "true") ? json.success_str : json.fail_str;
            $(".prompt p").text(msg);
            if (success == "true") {
                // TODO Arduino call
            }
        }).css("cursor", "pointer");
        return;
    }
    $(".image").each(function() {
        var id = $(this).attr("id");
        $(this).children('img').attr('src', path + screen[id]);
        var caption = getJsonObject(json.images.image, "name", screen[id]).caption;
        $(this).children('p').text(caption);
    });
    $(".prompt").children('p').text(json.prompt);
}

$(document).ready(function() {
    $("#wrapper").append($main_screen);
    $.getJSON("turgle_map.json", function(json) {
        loadScreen(json.first, json);
    });
    $(".option img").click(function() {
        var selected = $(this).attr("src");
        $.getJSON("turgle_map.json", function(json) {
            loadScreen(selected, json);
        });
    });
});
