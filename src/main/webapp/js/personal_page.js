import {Ajax} from 'http://localhost:9012/js/AJAX.js'
import show_PhotoSwipe from 'http://localhost:9012/js/PhotoSwipe_way.js'
import {AddpullUp, AddSlideUp} from 'http://localhost:9012/js/pull_slide_event.js'
import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'
window.user_student_id = '04192077';

class App {
	constructor(return_btn, adduser_btn, change_message, attent_btn) {
		this.return_btn = return_btn;
		this.adduser_btn = adduser_btn;
		this.change_message = change_message;
		this.data = getQueryStringArgs(location.search);
		this.attent_btn =attent_btn;
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
			this.send_attent();
		}, false);
		// 若该属性存在,则为查看别人的主页,
		if(this.data.check_id) {
			console.log('查看别人的主页');
		}
		this.render();
		if(this.data.check_id != undefined) {

			// 查看别人的页面
			proAjax({
				url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_info_and_message.do',
				type: 'get',
				data: {
					studentId : '04182097'
				},
				async: false,
			}).then((value) => {
				user.render(value);
				console.log(value);
				dynamic_obj.data = value.messageVos;
				dynamic_obj.render();
			});
		} else {
			// 查看自己的页面
			proAjax({
				//  得到用户的信息
				url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do',
				type: 'get',
				data: {
				},
				async: false,
			})
			.then((value) => {
				// 渲染用户头像和签名
				user.render(value);
				console.log(value.id);
				proAjax({
					url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_info_and_message.do',
					type: 'get',
					data: {
						studentId: value.studentId
					},
					async: false,
				}).then((value) => {
					// 渲染用户发送的动态部分
					// console.log(value);
					dynamic_obj.data = value.messageVos;
					dynamic_obj.render();

				});
			});
					}
	}
	render() {
		if(this.data.check_id != undefined) {
			this.change_message.style.display = 'none';
			this.adduser_btn.style.display = 'none';
		} else {
			this.attent_btn.style.display = 'none';
		}
	}
	send_attent() {
		proAjax({

		})
	}
}

const app = new App(document.getElementsByClassName('icon_wrapper')[0],
					document.getElementsByClassName('icon_wrapper')[1],
					document.getElementsByClassName('icon_wrapper')[2],
					document.getElementsByClassName('icon_wrapper')[3]
					);
app.init();


class User {
	constructor(name, headSculpture, signature, fans, concern, readCount) {
		this.name = name;
		this.headSculpture = headSculpture;
		this.signature = signature;
		this.fans = fans;
		this.concern = concern;
		this.readCount = readCount;
		// this.studentId = studentId;
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
					    document.getElementById('view_num')
	);

class Dynamic {
	constructor(el) {
		this.el = el;
		this.dynamic_num = 0;
		this.data = [];
	}

	init() {
	}

	render() {
		console.log(dynamic_obj.data.length);
		if(dynamic_obj.data.length == 0) {return}
		// 每次加载结束的下标
		let end_index = dynamic_obj.data.length - dynamic_obj.dynamic_num - 5 >= 0 ?  dynamic_obj.dynamic_num + 5 : dynamic_obj.data.length - 1;
		let item_str = '';
		for(let i = dynamic_obj.dynamic_num; i < end_index; i++) {
			let item_data = dynamic_obj.data[i];
			console.log(item_data);
			let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
			item_str += `<!--每一条动态模板--><div class="main_content_item" ><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='icon_wrapper delete_btn' onclick=deleteDynamic(${item_data.messageId})><img src="../../pic/attention.png"></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examine_dynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" src="../../pic/comment.png"><div>12</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseComment(${item_data.messageId}) src="../../pic/praise.png"><div class= "dynamic${item_data.messageId}">123</div></div></div></div>`;
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

function proAjax(obj) {
	return new Promise((reslove, reject) => {
		obj.success = function(responseText) {
			var json = JSON.parse(responseText);
			console.log(json);
			if(json.status) {
				if(json.msg == '当前未登录,请先登录~'){
					Ajax({
						url: 'http://118.31.12.175:8080/xiyouProject_war/user/login.do',
						type: 'get',
						data: {
							studentId: window.user_student_id
						},
						send_form: false,
						async: false,
						success: function(responseText) {
							var json = JSON.parse(responseText);
							if(json.status == 0) {
								console.log(json);
								window.user_id = json.data.id;
								window.user_message = json.data;
							}
						},
						fail: function(err) {
							console.log('登陆失败，请退出后重新登录');
						}
					})
				}else {
					alert('网络或数据库错误');
				}
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