

class App {
	constructor(return_btn, adduser_btn, change_message) {
		this.return_btn = return_btn;
		this.adduser_btn = adduser_btn;
		this.change_message = change_message;
	}
	init() {
		this.return_btn.addEventListener('click', () => {
			window.history.back();
		}, false);
		this.change_message.addEventListener('click', () => {
			window.location.href = 'user_message_set.html';
		}, false);
		this.adduser_btn.addEventListener('click', () => {
			window.location.href = 'find_user.html';
		}, false);

	}

}

const app = new App(document.getElementsByClassName('icon_wrapper')[0],
					document.getElementsByClassName('icon_wrapper')[1],
					document.getElementsByClassName('icon_wrapper')[2]
					);
app.init();


class User {
	constructor(name, headSculpture, signature, fans, concern, readCount, studentId) {
		this.name = name;
		this.headSculpture = headSculpture;
		this.signature = signature;
		this.fans = fans;
		this.concern = concern;
		this.readCount = readCount;
		this.studentId = studentId;
	}


	render (data) {
		this.name.innerHTML = data.username;
		this.headSculpture.src = data.headSculpture;
		this.signature.innerHTML = data.signature;
		this.fans.innerHTML = data.fans;
		this.concern.innerHTML = data.concern;
		this.readCount.innerHTML = data.readCount;
	}
}

const user = new User(  document.getElementsByClassName('user_name')[0],
						document.getElementsByClassName('user_head_pic')[0].getElementsByTagName('img')[0],
					    document.getElementsByClassName('user_sign')[0],
					    document.getElementById('fans_num'),
					    document.getElementById('gz_num'),
					    document.getElementById('view_num'),
					    window.user_student_id
	);


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
					user.render(json.data);
				}
			}
		}
	}
	let url = 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do';
	console.log(url);
	xhr.open('get', url, false);
	xhr.send(null);
})()


function Ajax(obj) {
	let xhr = new XMLHttpRequest();

}

