import {Ajax, promiseAjax} from 'http://localhost:9012/js/AJAX.js'
import show_PhotoSwipe from 'http://localhost:9012/js/PhotoSwipe_way.js'
import {AddpullUp, AddSlideUp} from 'http://localhost:9012/js/pull_slide_event.js'
import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'
import {window_addEvent, setSessionBack} from 'http://localhost:9012/js/setSessionBackRefresh.js'

// 修改window返回页面触发的函数
window_addEvent();
class App {
	constructor(return_btn, adduser_btn, change_message, attent_btn, no_attent_btn) {
		this.return_btn = return_btn;
		this.adduser_btn = adduser_btn;
		this.change_message = change_message;
		this.data = getQueryStringArgs();
		this.attent_btn = attent_btn;
		this.no_attent_btn = no_attent_btn;
		this.timer = null; // 事件节流

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
		this.attent_btn.addEventListener('click', () => {
			// 事件节流
			if(!this.timer) {
				this.change_attent_style();
				this.send_set_attent();
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000);
			}
		}, false);
		this.no_attent_btn.addEventListener('click', () => {
			if(!this.timer) {
				this.change_attent_style();
				this.send_cancel_attent();
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000);
			}
		}, false);
		// 若该属性存在,则为查看别人的主页,
		if(this.data.check_id) {
			console.log(`查看别人的主页,id为${this.data.check_id}`);
		}

		if(this.data.check_id != undefined) {
			//隐藏修改页面
			this.hideChangeAdd();
			// 查看别人的页面
			promiseAjax({
				url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_info_and_message.do',
				type: 'get',
				data: {
					id : this.data.check_id
				},
				async: false,
			}).then((value) => {
				value = JSON.parse(value);
				console.log(value);
				this.render(value.data.isConcernUser);
				dynamic_obj.data = value.messageVos;
				// 展示用户信息
				user.render(value.data);
				// 展示动态信息
				dynamic_obj.data = value.data.messageVos.slice(0);
				dynamic_obj.render();
			});
		} else {
			// 查看自己的页面
			this.hideAttent();
			promiseAjax({
				//  得到用户的信息
				url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do',
				type: 'get',
				data: {
				},
				async: false,
			}).then((value) => {
				value = JSON.parse(value);
				console.log(value);
				// 渲染用户头像和签名
				user.render(value.data);
				user.init(value.data.id);
				promiseAjax({
					url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_info_and_message.do',
					type: 'get',
					data: {
						id: value.data.id
					},
					async: false,
				}).then((value_dy) => {
					// 渲染用户发送的动态部分
					// console.log(value);
					value_dy = JSON.parse(value_dy);
					console.log(value_dy);
					// 浅拷贝
					dynamic_obj.data = value_dy.data.messageVos.slice(0);
					dynamic_obj.render();
				});
			});
			}
	}
	hideChangeAdd() {
		this.change_message.style.display = 'none';
		this.adduser_btn.style.display = 'none';
	}
	hideAttent() {
		this.attent_btn.style.display = 'none';
		this.no_attent_btn.style.display = 'none';
	}
	render(isParise) {
		if(isParise) {
			this.no_attent_btn.style.display = 'block';
			this.attent_btn.style.display = 'none';
		} else {
			this.no_attent_btn.style.display = 'none';
			this.attent_btn.style.display = 'block';
		}
	}
	send_set_attent() {
		promiseAjax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/user/concernUser.do',
			type: 'get',
			data: {
				concernedUserId: this.data.check_id
			},
			async: false
		}).then((value) => {
			value = JSON.parse(value);
			console.log(value);
		})
	}

	change_attent_style() {
		this.attent_btn.style.display = this.attent_btn.style.display == 'none' ? 'block' : 'none';
		this.no_attent_btn.style.display = this.attent_btn.style.display == 'none' ? 'block' : 'none';
	}
	send_cancel_attent() {
		promiseAjax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/user/canceledConcern.do',
			type: 'get',
			data: {
				concernedUserId: this.data.check_id
			},
			async: false
		}).then((value) => {
			value = JSON.parse(value);
			console.log(value);
		});
	}
}

const app = new App(document.getElementsByClassName('icon_wrapper')[0],
					document.getElementsByClassName('icon_wrapper')[1],
					document.getElementsByClassName('icon_wrapper')[2],
					document.getElementsByClassName('icon_wrapper')[3],
					document.getElementsByClassName('icon_wrapper')[4]
					);



class User {
	constructor(name, headSculpture, signature, fans, concern, readCount, user_attent_btn, user_fans_btn, readCount_btn) {
		this.name = name;
		this.headSculpture = headSculpture;
		this.signature = signature;
		this.fans = fans;
		this.concern = concern;
		this.readCount = readCount;
		// this.studentId = studentId;
		this.user_attent_btn = user_attent_btn;
		this.user_fans_btn = user_fans_btn;
		this.readCount_btn = readCount_btn;
	}

	init(user_id) {
		this.user_attent_btn.addEventListener('click', () => {
			window.location.href = `user_list_page.html?id=${user_id}&way=getAttentUsers`;
		}, false);
		this.user_fans_btn.addEventListener('click', () => {
			window.location.href = `user_list_page.html?id=${user_id}&way=getFansUsers`;
		}, false)
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
					    document.getElementsByClassName('mess_item')[0],
					    document.getElementsByClassName('mess_item')[1],
					    document.getElementsByClassName('mess_item')[2]
	);

class Dynamic {
	constructor(el) {
		this.el = el;
		this.dynamic_num = 0;
		this.data = null;
	}

	init() {
	}

	render() {
		console.log(dynamic_obj.data);
		if(dynamic_obj.data == null || dynamic_obj.data.length == 0) {return}
		// 每次加载结束的下标
		let end_index = dynamic_obj.data.length - dynamic_obj.dynamic_num - 5 >= 0 ?  dynamic_obj.dynamic_num + 5 : dynamic_obj.data.length - 1;
		let item_str = '';

		for(let i = dynamic_obj.dynamic_num; i < end_index; i++) {
			let item_data = dynamic_obj.data[i];
			console.log(item_data);
			let delete_str = app.data.check_id != undefined ? '' : `<div class='icon_wrapper delete_btn' onclick=deleteDynamic(${item_data.messageId})><img src="../../pic/delete_dynamic.png"></div>`;
			let parse_img_str = item_data.isPraise == 1 ? "../../pic/praise.png" : "../../pic/no_praise.png";
			let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
			item_str += `<!--每一条动态模板--><div class="main_content_item"><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div>${delete_str}<div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examineDynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" onclick=examine_dynamic(${item_data.userId},${item_data.messageId}) src="../../pic/comment.png"><div>${item_data.commentCount}</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseDynamic(${item_data.messageId},${item_data.isPraise}) src=${parse_img_str}><div class= "dynamic${item_data.messageId}">${item_data.praiseCount}</div></div></div></div>`;
		}
		dynamic_obj.el.innerHTML += item_str;
		dynamic_obj.dynamic_num = end_index;
	}
	getImgStr(imgs_arr) {
		let return_str = '';
		if(imgs_arr == null || imgs_arr.length == 0) { return return_str}
		for(let i = 0, len = imgs_arr.length; i < len; i ++) {
			return_str += `<div class="img_item"><img src=${imgs_arr[i]} alt=""></div>`
		}

		return return_str;
	}
}

const dynamic_obj = new Dynamic(document.getElementById('main_content_message'));

app.init();
dynamic_obj.init();
AddpullUp(document.getElementsByClassName('refreshText')[0], document.getElementById('main_content_message'), Ajax);
AddSlideUp(document.getElementsByClassName('refreshText')[1], document.getElementById('main_content_message'), dynamic_obj.render, '');


// function commentHtml(argument) {
// 	'
				// <div class="comment_item_wrapper">
				// 		<div class="comment_item_header">
				// 			<div class="comment_img_wrapper"><img src="../../pic/add_user.png"></div>
				// 			<div class="comment_item_name">EHTAN_YK</div>
				// 			<div class="comment_item_time">2020-2-16 8:00</div>
				// 		</div>
				// 		<div class="comment_item_mainer">
				// 			<div class="comment_item_mainer_text">
				// 				<span>此处是评论内容</span>
				// 			</div>
				// 			<div class="comment_item_reply">
				// 				<div class="reply_item">
				// 					<a class="reply_user_name">EHTAN_YK</a>
				// 					<span> :</span>
				// 					<div class="reply_content">不期而遇的才最惊喜不期而遇的才最惊喜.</div>
				// 				</div>
				// 			</div>
				// 		</div>
				// 	</div>

				// </div>';
// }