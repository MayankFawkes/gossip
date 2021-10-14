const myStorage = window.localStorage;
const createElement = (tag_name, properties = {}) => {
    const e = document.createElement(tag_name);
    Object.assign(e, properties);
    return e
}
const getFormData = ($form) => {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

let is_dark = (myStorage.getItem("dark") === 'true');

if (is_dark == true) {
  $("body").toggleClass("dark-mode");
}

$("#mode-toggle").click(function () {
  $("body").toggleClass("dark-mode");
  is_light = (myStorage.getItem("dark") === 'true');
  if (is_light == true) {
    is_dark = false
    myStorage.setItem("dark", false)
  } else {
    is_dark = true
    myStorage.setItem("dark", true)
  }
});

$(".messages-page__profile-settings").click(() => {
    $("#settingModalCenter").modal();
})

// chatting js

$chat_member = $(".chat__messaging")
$chat_member_avatar = $(".chat-member__avatar").children().first()
$chat_member_name = $(".chat-member__name")
$chat_member_status = $(".chat-member__status")

const makeMessageTime = (time) => {
	let tm = createElement("div", {className: "message__time"});
	tm.innerText = time;
	return tm
}
const makeMessageElement = (time) => {
	let li = $(createElement("li"));
	let div = $(createElement("div", {className: "chat__time"}));
	div.text(dateFormat(time));
	li.append(div);
	return li[0]
}
const makeMessage = (message, id, by, time) => {
	let msg = createElement("div", {className: "chat__bubble", id: `chat-messages-${id}`});
	msg = $(msg);
	if (by === "me"){
		msg.addClass("chat__bubble--me")
	} else {
		msg.addClass("chat__bubble--you")
	}
	msg.text(message);
	msg.append(makeMessageTime(messageTime(time)));
	return msg[0];
}

const publish_chat_message = (pos, ele) => {
	if (!pos){
		$chat_message_list.children().first().prepend(ele)
	} else {
		$chat_message_list.children().last().append(ele)
	}
}

// chatting js end

// recent chat js