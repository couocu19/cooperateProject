import {Ajax} from 'http://localhost:9012/js/AJAX.js'
import show_PhotoSwipe from 'http://localhost:9012/js/PhotoSwipe_way.js'
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

class Comment {
	constructor(el) {
		this.el = el;
	}

	init() {
		this.el.addEventListener('click', () => {}, false);
	}

	render(data) {
		for(let i = 0; i >= 0; i ++) {
			let item = `<!--每一条动态模板--><divclass="main_content_item"><!--头部信息--><divclass="head_name_item"><divclass="user_head_pic_item"><imgsrc="https://wx1.sinaimg.cn/orj480/006Q5xF4ly8gb3gewuketj30u00u0wiy.jpg"></div><pclass="user_name_item">EHTAN_YK</p><divclass="send_time_item">2020-2-1318:00</div></div><!--文字和图片部分--><divclass="item_main"><divclass="item_text">后来后来后来后来后来后来后来后来后来后来后来后来后来后来后来后来后来后来后来后来</div><divclass="item_img_wrapper"><divclass="img_item"><imgsrc="https://wx1.sinaimg.cn/orj480/006Q5xF4ly8gb3gewuketj30u00u0wiy.jpg"alt=""></div><divclass="img_item"><imgsrc="https://wx1.sinaimg.cn/orj480/006Q5xF4ly8gb3gewuketj30u00u0wiy.jpg"alt=""></div><divclass="img_item"><imgsrc="https://wx1.sinaimg.cn/orj480/006Q5xF4ly8gb3gewuketj30u00u0wiy.jpg"alt=""></div></div></div>`;
			el.innerHTML += item;
		}
	}
}


function proAjax(obj) {
	return new Promise((reslove, reject) => {
		obj.success = function(responseText) {
			var json = JSON.parse(responseText);
			console.log(json);
			if(json.status) {
				alert('网络或数据库错误');
			} else {
				reslove(json.data)
			}
	  	}
		obj.fail = function (err) {
			console.log('登陆失败，请退出后重新登录');
			reject(err);
		}
		Ajax(obj);
	});
}

proAjax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do',
	type: 'get',
	data: {
		studentId: window.user_student_id
	},
	async: false,
})
.then((value) => {
	// 渲染用户头像和签名
	user.render(value);
	console.log(value.id);
	proAjax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_message.do',
		type: 'get',
		data: {
			id: value.id
		},
		async: false,
	}).then(() => {
		// 渲染用户发送的动态部分


	});
});


// function commentHtml(argument) {
// 	'<div class="comment_praise_wrapper">
// 				<div class="cp_wrapper">
// 					<img class="btn_style" src="../../pic/comment.png">
// 					<div>12</div>
// 					<img class="btn_style" src="../../pic/praise.png">
// 					<div>123</div>
// 				</div>
// 				<div class="comment_main_wrapper">
// 					<div class="comment_item_wrapper">
// 						<div class="comment_item_header">
// 							<div class="comment_img_wrapper"><img src="../../pic/add_user.png"></div>
// 							<div class="comment_item_name">EHTAN_YK</div>
// 							<div class="comment_item_time">2020-2-16 8:00</div>
// 						</div>
// 						<div class="comment_item_mainer">
// 							<div class="comment_item_mainer_text">
// 								<span>此处是评论内容</span>
// 							</div>
// 							<div class="comment_item_reply">
// 								<div class="reply_item">
// 									<a class="reply_user_name">EHTAN_YK</a>
// 									<span> :</span>
// 									<div class="reply_content">不期而遇的才最惊喜不期而遇的才最惊喜.</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 				</div>'
// }