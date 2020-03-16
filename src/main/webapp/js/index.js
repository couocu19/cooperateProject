import {Ajax, promiseAjax} from 'http://localhost:9012/js/AJAX.js'

window.active_user_id = null;
window.user_student_id = '04181019';
window.user_id = null;
window.user_message = null;


promiseAjax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/user/register.do',
	type: 'get',
	data: {
		studentId: window.user_student_id
	},
	send_form: false,
	async: false
}).then((responesText) => {
	let json = JSON.parse(responesText);
	if(json.msg == '注册失败~') {
		Ajax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/user/login.do',
			type: 'get',
			data: {
				studentId: window.user_student_id
			},
			send_form: false,
			async: false,
			success: (responesText) => {
				let json = JSON.parse(responesText);
				console.log(json);
			},
			fail: (err) => {
				console.log(err);
			}
		})
	}
}).catch((err) => {
	console.log(err);
})

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
	}

}



var obj = new Obj(  document.getElementById('user_mess'),
					document.getElementById('user_message'),
					document.getElementById('write'),
					document.getElementsByClassName('nav_item')[0]);
obj.init();