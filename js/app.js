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
    $(".image").each(function() {
        var id = $(this).attr("id");
        $(this).children('img').attr('src', path + screen[id]);
        caption = getJsonObject(json.images.image, "name", screen[id]).caption;
        $(this).children('p').text(caption);
    });
    $(".prompt").children('p').text(json.prompt);
}

$(document).ready(function() {

    $.getJSON("turgle_map.json", function(json) {
        loadScreen(json.first, json);
    });

    $(".option img").click(function() {
        selected = $(this).attr("src");
        $.getJSON("turgle_map.json", function(json) {
            loadScreen(selected, json);
        });
    });
});
