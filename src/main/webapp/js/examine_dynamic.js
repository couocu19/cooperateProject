
function getQueryStringArgs() {
	let data_str = window.location.search;
	let str = (data_str.length > 0 ? data_str.substring(1) : ''),
		args = {}, // 保存数据的对象

		item_arr = str.length > 0 ? str.split('&') : [],
		item = null,
		name = null,
		value= null,
		i = 0,
		len = item_arr.length;
	while(i < len) {
		item = item_arr[i].split('=');
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		args[name] = value;
		i++;
	}
	return args;
}


function examineDynamic(user_id, message_id) {
	window.location.href  = getLocationSendUrl('detail_dynamic.html', getQueryStringArgs().user_student_id, user_id, message_id);
}

function getLocationSendUrl(url, user_student_id, user_id, message_id) {
	return `${url}?user_student_id=${user_student_id}&user_id=${user_id}&message_id=${message_id}`;
}

function pariseDynamic(messageId, parise) {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status <= 304) {
				let json = JSON.parse(xhr.responseText);
				if(json.status == 0) {
					// 成功
					window.location.reload();
					console.log(json);
				} else {
					console.log(json);
				}
			}
		}
	}
	let url = `http://118.31.12.175:8080/xiyouProject_war/message/praise.do?messageId=${messageId}`;
	console.log(url);
	xhr.open('get', url, false);
	xhr.send(null);
}

function deleteDynamic(delete_id) {
	console.log(`删除动态id为${delete_id}的动态`);
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status <= 304) {
				let json = JSON.parse(xhr.responseText);
				if(json.status == 0) {
					console.log(json);
					// 成功
					window.location.reload();
				} else {
					console.log(json);
				}
			}
		}
	}
	let url = `http://118.31.12.175:8080/xiyouProject_war/message/delete.do?messageId=${delete_id}`;
	xhr.open('get', url, false);
	xhr.send(null);
}