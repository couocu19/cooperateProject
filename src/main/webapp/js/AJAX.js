
/*
ajax({
    url: "", //请求地址
    type: 'get',   //请求方式
    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数
    async: false,   //是否异步
    success: function (responseText) {
        //   此处执行请求成功后的代码
    },
    fail: function (err) {
        // 此处为执行成功后的代码
    }
}); */

function Ajax(obj) {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
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
		let message = getParmer(obj.data);
		xhr.open("get", obj.url + "?" + message, obj.async);
		xhr.send(null);
	} else if (obj.type == 'post') {
		xhr.open("post", obj.url, obj.async);
		if(obj.send_form == true) {
			let formdata = new FormData();
			for(let key in obj.data) {
				if(key == 'upload_file') {
					for(let i = 0, len = obj.data[key].length; i < len; i++) {
						formdata.append(key, obj.data[key][i]);
					}
				} else {
					formdata.append(key, obj.data[key]);
				}
			}
			xhr.send(formdata);
		} else {
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(message);
		}

	}

	function getParmer(data) {
		var arr = [];
		for (var thing in data) {
			arr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));
		}
		return arr.join('&');
	}
}


export {Ajax};