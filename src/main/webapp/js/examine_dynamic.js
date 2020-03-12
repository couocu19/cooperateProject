



function examine_dynamic(user_id, message_id) {
	window.location.href  = getLocationSendUrl('detail_dynamic.html' ,user_id, message_id);
}

function getLocationSendUrl(url, user_id, message_id) {
	return `${url}?user_id=${user_id}&message_id=${message_id}`;
}

function pariseComment(messageId) {
	console.log('paiseCommie open')
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status <= 304) {
				let json = JSON.parse(xhr.responseText);
				if(json.status == 0) {
					// 成功
					let clas = 'dynamic' + messageId;
					document.getElementsByClassName(clas)[1].style.color = 'blue';
				} else {
					console.log(json)
				}
			}
		}
	}
	let url = `http://118.31.12.175:8080/xiyouProject_war/message/praise.do?messageId=${messageId}`;
	xhr.open('get', url, false);
	xhr.send(null);
}