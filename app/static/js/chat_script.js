$chat = $(".chat");
$me = $(".me");
$profile = $(".user-profile");
$chat_message_list = $(".chat__list-messages")
const viewChat = () => {$chat_message_list.children().get(-1).scrollIntoView()}
const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
/* ===================================
		Screen resize handler
====================================== */
const smallDevice = window.matchMedia("(max-width: 767px)");
const largeScreen = window.matchMedia("(max-width: 1199px)");
smallDevice.addEventListener("change", handleDeviceChange);
largeScreen.addEventListener("change", handleLargeScreenChange);


handleDeviceChange(smallDevice);
handleLargeScreenChange(largeScreen);

function handleDeviceChange(e) {
	if (e.matches) chatMobile();
	else chatDesktop();
}

function handleLargeScreenChange(e) {
	if (e.matches) profileToogleOnLarge();
	else profileExtraLarge();
}

function chatMobile() {
	$chat.addClass("chat--mobile");
	$me.addClass("chat--mobile");
	$me.removeClass("chat--show");
}

function chatDesktop() {
	$chat.removeClass("chat--mobile");
	$me.removeClass("chat--mobile");
	$me.addClass("chat--show");
}

function profileToogleOnLarge() {
	$profile.addClass("user-profile--large");
}

function profileExtraLarge() {
	$profile.removeClass("user-profile--large");
}

/* ===================================
		Events
====================================== */

$(".messages-page__title").click(() => {
	$chat.hide();
	$profile.hide();
	$me.show();
	$me.addClass("chat--show");
})

$(".messaging-member").click(function () {
	$me.hide();
	$chat.show();
	$profile.show();
	$chat.fadeIn();
	$chat.addClass("chat--show");
	viewChat()
});

$(".chat__previous").click(function () {
	$chat.removeClass("chat--show");
});

$(".me_exit").click(function () {
	$me.removeClass("chat--show");
});

$(".chat__details").click(function () {
	$profile.fadeIn();
	$profile.addClass("user-profile--show");
});

$(".user-profile__close").click(function () {
	$profile.removeClass("user-profile--show");
});

$(".overlay").fadeOut()

function dateFormat(_date) {
	_date = new Date(_date)
	let d = new Date();
	let date = _date.getDate()
	let month = _date.getMonth()
	let weekDay = _date.getDay()

	if (d.getDate() == _date.getDate()) {
		return null
	} else if (d.getDate() == (_date.getDate() - 1)) {
		return "Yesterday "+ strTime;
	} else {
		return `${weeks[weekDay]}, ${date} ${months[month-1]}` 
	}
}

const messageTime = (_date) => {
	_date = new Date(_date)
	let hours = _date.getHours();
	let minutes = _date.getMinutes();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime
}


