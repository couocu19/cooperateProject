



class App {


	constructor(return_btn, send_btn, username, signature, headSculpture) {
		this.return_btn = return_btn;
		this.send_btn = send_btn;
		this.user_message = {
			username : username,
			signature : signature,
			headSculpture : headSculpture
		}
	}

	init() {
		this.return_btn.addEventListener('click', () => {
			window.history.back();
		}, false);
		this.send_btn.addEventListener('click', () => {
			if(this.sendAjax()) {
				window.history.back();
			}
		}, false);

	}
	render(data) {
		this.user_message.username.value = data.username;
		this.user_message.signature.value = data.signature;
		this.user_message.headSculpture.src = data.headSculpture;
	}
	sendAjax() {
		return Ajax(this.user_message.username.value, this.user_message.signature.value);
	}
}

const app = new App(document.getElementById('return_btn'),
					document.getElementById('send_btn'),
					document.getElementById('user_name_text'),
					document.getElementById('user_sign_text'),
					document.getElementsByClassName('img_style'));
app.init();
function createXhr() {
	if(typeof XMLHttpRequest != 'undefined') {
		createXhr = function() {
			return new XMLHttpRequest();
		}
	} else if(typeof ActiveXObject != 'undefined'){
		createXhr = function () {
			if (typeof arguments.callee.activeXString != 'string')  {
				var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
				var i, len;
				for (i = 0, len = versions.length; i < len; i ++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
							break;
					} catch(ex) {

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}

	} else {
		createXhr = function() {
			throw new Error('No XHR object available.');
		}
	}
	return createXhr();
}


function Ajax(username, signature) {
	var xhr = createXhr();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
				var json = JSON.parse(xhr.responseText);
				console.log(json);
				if(json.status) {
					alert('网络或数据库错误');
				} else {
					return true;
				}
			}
		}
	}
	let url = 'http://118.31.12.175:8080/xiyouProject_war/user/update.do';
	console.log(url);
	xhr.open('post', url, true);
	var formdata = new FormData();
	formdata.append('username', username);
	formdata.append('signature', signature);
	xhr.send(formdata);
}

(function () {
	var xhr = createXhr();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
				var json = JSON.parse(xhr.responseText);
				console.log(json);
				if(json.status) {
					alert('网络或数据库错误');
				} else {
					app.render(json.data);
				}
			}
		}
	}
	let url = 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do';
	console.log(url);
	xhr.open('get', url, false);
	xhr.send(null);
})()