import {Ajax, promiseAjax} from 'http://localhost:9012/js/AJAX.js'
import {AddpullUp, AddSlideUp} from 'http://localhost:9012/js/pull_slide_event.js'

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
	} else {

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
			window.location.href = `personal_page.html?user_student_id=${window.user_student_id}`;
		}, false);
		this.write_btn.addEventListener('click', () => {
			window.location.href = `compile_page.html?user_student_id=${window.user_student_id}`;
		}, false);
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

class Dynamic {
	constructor(all_dynamic_show, concern_dynamic_show, all_dynamic_el, concern_dynamic_el) {
		this.all_dynamic_show = all_dynamic_show;
		this.concern_dynamic_show = concern_dynamic_show;
		this.all_dynamic_el = all_dynamic_el;
		this.concern_dynamic_el = concern_dynamic_el;
		this.all_dynamic_num = 0;
	}


	init() {
		this.all_dynamic_show.addEventListener('click', () => {
			this.all_dynamic_el.style.display = 'block';
			this.concern_dynamic_el.style.display = 'none';
		}, false);
		this.concern_dynamic_show.addEventListener('click', () => {
			renderConcernDynamic();
			this.all_dynamic_el.style.display = 'none';
			this.concern_dynamic_el.style.display = 'block';
		}, false);
	}
	// renderAllDynamic() {
	// 	console.log(dynamic_obj.all_dynamic_data);
	// 	if(dynamic_obj.all_dynamic_data == null || dynamic_obj.all_dynamic_data.length == 0) {return}
	// 	// 每次加载结束的下标
	// 	let end_index = dynamic_obj.all_dynamic_data.length - dynamic_obj.all_dynamic_num - 5 >= 0 ?  dynamic_obj.all_dynamic_num + 5 : dynamic_obj.all_dynamic_data.length - 1;
	// 	let item_str = '';

	// 	for(let i = dynamic_obj.all_dynamic_num; i < end_index; i++) {
	// 		let item_data = dynamic_obj.all_dynamic_data[i];
	// 		console.log(item_data);
	// 		let parse_img_str = item_data.isPraise == 1 ? "../../pic/praise.png" : "../../pic/no_praise.png";
	// 		let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
	// 		let color_ = item_data.isPraise == 1 ? 'blue': 'black';
	// 		item_str += `<!--每一条动态模板--><div class="main_content_item"><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examineDynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" onclick=examine_dynamic(${item_data.userId},${item_data.messageId}) src="../../pic/comment.png"><div>${item_data.commentCount}</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseDynamic(${item_data.messageId},${item_data.isPraise}) src=${parse_img_str}><div class= "dynamic${item_data.messageId}" style='color:${color_}'>${item_data.praiseCount}</div></div></div></div>`;
	// 	}
	// 	dynamic_obj.all_dynamic_el.innerHTML += item_str;
	// }

	renderAllDynamic(data) {
		console.log(data);
		if(data == null || data.length == 0) {return}
		// 每次加载结束的下标
		let end_index = data.length;
		let item_str = '';

		for(let i = 0; i < end_index; i++) {
			let item_data = data[i];
			console.log(item_data);
			let parse_img_str = item_data.isPraise == 1 ? "../../pic/praise.png" : "../../pic/no_praise.png";
			let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
			let color_ = item_data.isPraise == 1 ? 'blue': 'black';
			item_str += `<!--每一条动态模板--><div class="main_content_item"><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examineDynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" onclick=examine_dynamic(${item_data.userId},${item_data.messageId}) src="../../pic/comment.png"><div>${item_data.commentCount}</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseDynamic(${item_data.messageId},${item_data.isPraise}) src=${parse_img_str}><div class= "dynamic${item_data.messageId}" style='color:${color_}'>${item_data.praiseCount}</div></div></div></div>`;
		}
		dynamic_obj.all_dynamic_el.innerHTML += item_str;
	}

	renderConcernDynamic(data) {
		console.log(data);
		if(data == null || data.length == 0) {return}
		// 每次加载结束的下标
		let end_index = data.length;
		let item_str = '';

		for(let i = 0; i < end_index; i++) {
			let item_data = data[i];
			console.log(item_data);
			let parse_img_str = item_data.isPraise == 1 ? "../../pic/praise.png" : "../../pic/no_praise.png";
			let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
			let color_ = item_data.isPraise == 1 ? 'blue': 'black';
			item_str += `<!--每一条动态模板--><div class="main_content_item"><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examineDynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" onclick=examine_dynamic(${item_data.userId},${item_data.messageId}) src="../../pic/comment.png"><div>${item_data.commentCount}</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseDynamic(${item_data.messageId},${item_data.isPraise}) src=${parse_img_str}><div class= "dynamic${item_data.messageId}" style='color:${color_}'>${item_data.praiseCount}</div></div></div></div>`;
		}
		dynamic_obj.concern_dynamic_el.innerHTML += item_str;
	}

	freshAllDynamic(data) {
		console.log(data);
		if(data == null || data.length == 0) {return}
		// 每次加载结束的下标
		let end_index = data.length;
		let item_str = '';

		for(let i = 0; i < end_index; i++) {
			let item_data = data[i];
			console.log(item_data);
			let parse_img_str = item_data.isPraise == 1 ? "../../pic/praise.png" : "../../pic/no_praise.png";
			let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
			let color_ = item_data.isPraise == 1 ? 'blue': 'black';
			item_str += `<!--每一条动态模板--><div class="main_content_item"><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examineDynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" onclick=examine_dynamic(${item_data.userId},${item_data.messageId}) src="../../pic/comment.png"><div>${item_data.commentCount}</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseDynamic(${item_data.messageId},${item_data.isPraise}) src=${parse_img_str}><div class= "dynamic${item_data.messageId}" style='color:${color_}'>${item_data.praiseCount}</div></div></div></div>`;
		}
		dynamic_obj.all_dynamic_el.innerHTML = item_str;
	}

	freshConcernDynamic(data) {
		console.log(data);
		if(data == null || data.length == 0) {return}
		// 每次加载结束的下标
		let end_index = data.length;
		let item_str = '';

		for(let i = 0; i < end_index; i++) {
			let item_data = data[i];
			console.log(item_data);
			let parse_img_str = item_data.isPraise == 1 ? "../../pic/praise.png" : "../../pic/no_praise.png";
			let imgs_str = dynamic_obj.getImgStr(item_data.contentImages);
			let color_ = item_data.isPraise == 1 ? 'blue': 'black';
			item_str += `<!--每一条动态模板--><div class="main_content_item"><!--头部信息--><div class="head_name_item"><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.username}</p><div class="send_time_item">${item_data.time}</div></div></div><!--文字和图片部分--><div class="item_main" onclick=examineDynamic(${item_data.userId},${item_data.messageId})><div class="item_text">${item_data.contentText}</div><div class="item_img_wrapper">${imgs_str}</div></div><div class="comment_praise_wrapper"><div class="cp_wrapper"><img class="btn_style" onclick=examine_dynamic(${item_data.userId},${item_data.messageId}) src="../../pic/comment.png"><div>${item_data.commentCount}</div><img class="btn_style dynamic${item_data.messageId}" onclick=pariseDynamic(${item_data.messageId},${item_data.isPraise}) src=${parse_img_str}><div class= "dynamic${item_data.messageId}" style='color:${color_}'>${item_data.praiseCount}</div></div></div></div>`;
		}
		dynamic_obj.concern_dynamic_el.innerHTML = item_str;
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


let dynamic_obj = new Dynamic(  document.getElementsByClassName('item_gc')[0],
								document.getElementsByClassName('item_gz')[0],
								document.getElementById('all_dynamic'),
								document.getElementById('concern_dynamic'));
dynamic_obj.init();
var obj = new Obj(  document.getElementById('user_mess'),
					document.getElementById('user_message'),
					document.getElementById('write'),
					document.getElementsByClassName('nav_item')[0]);
obj.init();


promiseAjax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/message/getAll.do',
	type: 'get',
	dat: {		
	},
	async: false
}).then((value) => {
	value = JSON.parse(value);
	// 渲染动态
	dynamic_obj.renderAllDynamic(value.data);
});

function renderAllDynamic(data) {
	promiseAjax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/message/getAll.do',
		type: 'get',
		dat: {		
		},
		async: false
	}).then((value) => {
		value = JSON.parse(value);
		// 渲染动态
		dynamic_obj.renderAllDynamic(value.data);
	});
}

function renderConcernDynamic() {
	promiseAjax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/message/getAll.do',
		type: 'get',
		dat: {		
		},
		async: false
	}).then((value) => {
		value = JSON.parse(value);
		// 渲染动态
		dynamic_obj.renderConcernDynamic(value.data);
	});
}

function freshAllDynamic() {
	promiseAjax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/message/getAll.do',
		type: 'get',
		dat: {		
		},
		async: false
	}).then((value) => {
		value = JSON.parse(value);
		// 渲染动态
		dynamic_obj.freshAllDynamic(value.data);
	});
}

function freshConcernDynamic() {
	promiseAjax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/message/getAll.do',
		type: 'get',
		dat: {		
		},
		async: false
	}).then((value) => {
		value = JSON.parse(value);
		// 渲染动态
		dynamic_obj.freshConcernDynamic(value.data);
	});
}

AddpullUp(document.getElementsByClassName('refreshText')[0], document.getElementById('all_dynamic'), renderAllDynamic);
AddpullUp(document.getElementsByClassName('refreshText')[0], document.getElementById('concern_dynamic'), renderConcernDynamic);
// 添加下滑函数事件
AddSlideUp(document.getElementsByClassName('refreshText')[1], document.getElementById('all_dynamic'), renderAllDynamic, '');
AddSlideUp(document.getElementsByClassName('refreshText')[1], document.getElementById('concern_dynamic'), renderAllDynamic, '')