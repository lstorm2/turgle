/* provides the layout of each result screens */
$result_screen = $([
   "<div class='main_image image' id='main'>",
   "    <img src='' />  ",
   "    <p></p>",
   "</div>"
].join("\n"));

$final_screen = $([
   "<div id='final_msg'>",
   "    <p></p>",
   "    <button type='button' onClick='restart()'>Restart</button>",
   "</div>",
].join("\n"));

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function restart() {
    window.location.replace("directions.html");
}

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

function loadScreen(option, json, prompt) {
    var path = json.images.path;
    option = option.replace(path, "");
    var screen = getJsonObject(json.screens.screen, "main", option);
    if (screen == -1) {
        /* load the result screen */
        $("#wrapper").empty().append($result_screen);
        option = option.splice(option.length - 4, 0, "end");
        $(".main_image img").attr("src", path + option);
        var caption = getJsonObject(json.images.image, "name", option).caption;
        $(".main_image p").text(caption);
        $(".main_image img").click(function() {
            var success = getJsonObject(json.images.image, "name", option).success;
            $("#wrapper").empty().append($final_screen);
            var msg = (success == "true") ? json.success_str : json.fail_str;
            $("#final_msg p").text(msg);
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
    $(".prompt").children('p').text(prompt);
}

function init_turgle() {
    $.getJSON("turgle_map.json", function(json) {
        loadScreen(json.first, json, json.main_prompt);
    });
    $(".option img").click(function() {
        var selected = $(this).attr("src");
        $.getJSON("turgle_map.json", function(json) {
            loadScreen(selected, json, json.prompt);
        });
    });
}

// GPIO functions
function gpio_pin_high(pin) {
    gpio_pin(pin, 1);
}

function gpio_pin_low(pin) {
    gpio_pin(pin, 0);
}

function gpio_pin(pin, val) {
    var gpio = require("pi-gpio");
    gpio.open(pin, "output", function(err) {
        if (err) {
            console.log(err);
        } else {
            gpio.write(pin, val, function() {
                gpio.close(pin);
            });
        }
    });
}
