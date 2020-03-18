import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'
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
			if (xhr.status >= 200 && xhr.status <= 300) {
				obj.success(xhr.responseText);
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
		console.log(obj.url);
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


function promiseAjax(obj) {
	return new Promise((reslove, reject) => {
		obj.success = (responseText) => {
			// 如果提示该操作需要cookie 则重新请求下发cookie
			let json = JSON.parse(responseText);
			if(json.msg == 'LOSE-COOKIE'){
				setCookie();
			}else {
				reslove(responseText);
			}
		};
		obj.fail = (err) => {
			reject(err);
		}
		Ajax(obj);
	});
}

function setCookie() {
	Ajax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/user/login.do',
		type: 'get',
		data: {
			studentId: getQueryStringArgs().user_student_id
		},
		send_form: false,
		async: false,
		success: function(responseText) {
			var json = JSON.parse(responseText);
			if(json.status == 0) {
				console.log(json);
				window.user_id = json.data.id;
				window.user_message = json.data;
				window.location.reload();
			}
		},
		fail: function(err) {
			console.log('登陆失败，请退出后重新登录');
		}
	});
}
export {Ajax, promiseAjax};