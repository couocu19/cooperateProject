
window.active_user_id = null;
window.user_student_id = '04192077';
window.user_id = null;
window.user_message = null;
// 立即执行函数，请求用户信息
(function () {
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
				var json = JSON.parse(xhr.responseText);
				if(json.status == 0) {
					console.log(json);
					window.user_id = json.data.id;
					window.user_message = json.data;
				}
			}
		}
	}
	let url = 'http://118.31.12.175:8080/xiyouProject_war/user/login.do?studentId=' + window.user_student_id;
	xhr.open('get', url, false);
	xhr.send(null);
})();

class Obj{
	constructor(user_btn, message_btn, write_btn, nav_item ) {
		this.user_btn = user_btn;
		this.message_btn = message_btn;
		this.write_btn = write_btn;
		this.nav_item = nav_item;
	}

	init() {
		this.nav_item.addEventListener('click', (e) => {
			this.handleNavClick(e);
		}, false);
		this.user_btn.addEventListener('click', () => {
			console.log('ok');
			window.location.href = 'personal_page.html';
		}, false);
		this.write_btn.addEventListener('click', () => {
			window.location.href = 'compile_page.html';
		}, false);
	}
	// 渲染页面函数
	render(data) {

	}


	handleNavClick(e) {
		let target = e.target;

		if(target.classList.contains('cur') || target == this.nav_item) {
			// 如果未点击上按钮或点击的按钮已经被选择，则直接退出
			return;
		}

		for(let i = 0; i < this.nav_item.childElementCount; i++) {
			this.nav_item.childNodes[i].classList.remove('cur');
		}

		target.classList.add('cur');
		//执行渲染函数
		this.sendAjax();
	}

	sendAjax() {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if(xhr.readystate == 4) {
				if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
					// 正确的处理
					let json = JSON.prase(xhr.responseText);
				}
			}
		}
	}
}



var obj = new Obj(  document.getElementById('user_mess'),
					document.getElementById('user_message'),
					document.getElementById('write'),
					document.getElementsByClassName('nav_item')[0]);
obj.init();