const myStorage = window.localStorage;
const myModal = new bootstrap.Modal(document.getElementById('settingModalCenter'))
const createElement = (tag_name, properties = {}) => {
    const e = document.createElement(tag_name);
    Object.assign(e, properties);
    return e
}
const forms = {
	settings_account: {url:"", request:"", rid:""},
	settings_change_password: {url:"", request:"", rid:""},
	settings_social: {url:"", request:"", rid:""}
}

$(".messages-page__profile-settings").click(() => {
    myModal.show();
})

// chatting js

$chat_member = $(".chat__messaging")
$chat_member_avatar = $(".chat-member__avatar").children().first()
$chat_member_name = $(".chat-member__name")
$chat_member_status = $(".chat-member__status")

const makeMessageTime = (time) => {
    let tm = createElement("div", { className: "message__time" });
    tm.innerText = time;
    return tm
}
const makeMessageElement = (time) => {
    let li = $(createElement("li"));
    let div = $(createElement("div", { className: "chat__time" }));
    div.text(dateFormat(time));
    li.append(div);
    return li[0]
}
const makeMessage = (message, id, by, time) => {
    let msg = createElement("div", { className: "chat__bubble", id: `chat-messages-${id}` });
    msg = $(msg);
    if (by === "me") {
        msg.addClass("chat__bubble--me")
    } else {
        msg.addClass("chat__bubble--you")
    }
    msg.text(message);
    msg.append(makeMessageTime(messageTime(time)));
    return msg[0];
}

const publish_chat_message = (pos, ele) => {
    if (!pos) {
        $chat_message_list.children().first().prepend(ele)
    } else {
        $chat_message_list.children().last().append(ele)
    }
}

// chatting js end

// recent chat js