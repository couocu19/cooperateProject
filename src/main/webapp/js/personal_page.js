import {Ajax} from 'http://localhost:9012/js/AJAX.js'

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


Ajax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do',
	type: 'get',
	data: {
		studentId: window.user_student_id
	},
	async: false,
	success: function(responseText) {
		var json = JSON.parse(responseText);
		console.log(json);
		if(json.status) {
			alert('网络或数据库错误');
		} else {
			user.render(json.data);
		}
	},
	fail: function(err) {
		console.log('登陆失败，请退出后重新登录');
	}
});