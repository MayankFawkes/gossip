const $body = $("body")
const $toggle = $("#toggle")

let is_dark = (myStorage.getItem("dark") === 'true');

if (is_dark == true) {
    $body.addClass("dark-mode");
} else {
	$toggle.prop('checked', false);
}

$toggle.click(function() {
    $body.toggleClass("dark-mode");
    is_light = (myStorage.getItem("dark") === 'true');
    if (is_light == true) {
        is_dark = false
		$toggle.prop('checked', is_dark);
        myStorage.setItem("dark", is_dark)
    } else {
        is_dark = true
		$toggle.prop('checked', is_dark);
        myStorage.setItem("dark", is_dark)
    }
});