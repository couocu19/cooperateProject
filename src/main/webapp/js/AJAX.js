
export default function Ajax(obj) {
	xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
	var message = getParmer(obj.data);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				obj.success(xhr.responseText, xhr.responseXML);
			} else {
				obj.fail(xhr.status);
			}
		}
	};

	if (obj.type == 'get') {
		xhr.open("get", obj.url + "?" + message, obj.async);
		xhr.send(null);
	} else if (obj.type == 'post') {
		xhr.open("post", obj.url, obj.async);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(message);
	}

	function getParmer(data) {
		var arr = [];
		for (var thing in data) {
			arr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));
		}
		return arr.join('&');
	}
}