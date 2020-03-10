



function examine_dynamic(user_id, message_id) {
	window.location.href  = getLocationSendUrl('detail_dynamic.html' ,user_id, message_id);
}

function getLocationSendUrl(url, user_id, message_id) {
	return `${url}?user_id=${user_id}&message_id=${message_id}`;
}

