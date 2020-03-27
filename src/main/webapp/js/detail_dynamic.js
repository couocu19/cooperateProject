import {Ajax, promiseAjax} from './AJAX.js'
import show_PhotoSwipe from './PhotoSwipe_way.js'
import {getBase64ImgWidthHeight} from './getBase64ImgWidthHeight.js'
import {getQueryStringArgs} from './getQueryStringArgs.js'
import {window_addEvent, setSessionBack} from './setSessionBackRefresh.js'

// 为window添加返回刷新事件
window_addEvent();
let app_user_id = null;

class Obj {
	constructor(return_btn, more_options, send_comment_btn, comment_text) {
		this.return_btn = return_btn;
		this.more_options = more_options;
		this.user_message = getQueryStringArgs(location.search);
		this.send_comment_btn = send_comment_btn;
		this.comment_text = comment_text;
		this.timer = null;
	}
	init() {
		this.return_btn.addEventListener('click', () => {
			setSessionBack();
		}, false);
		console.log(this.user_message);
		this.send_comment_btn.addEventListener('click', () => {
			this.send_comment();
		}, false);
	}
	send_comment() {
		// 如果发送内容不合法, 就直接退出函数
		if(!this.check_comment()) {return}
		console.log('发送评论');
		promiseAjax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/comment/addToMessage.do',
			type: 'post',
			data: {
				messageId : obj.user_message.message_id,
				content: obj.comment_text.value
			},
			send_form: true,
			async: false
		}).then((responedText) => {
			let json = JSON.parse(responedText);
			console.log(json);
			window.location.reload();
		}).catch((err) => {
			console.log(err);
		});
	}
	check_comment() {
		if(this.comment_text.value.length == 0) {return false}
		return true;
	}
}


const obj = new Obj(document.getElementsByClassName('return_btn')[0],
					document.getElementsByClassName('set_btn')[0],
					document.getElementById('submit_comment'),
					document.getElementById('text_area'));
obj.init();
// 得到信息数组

class MainerText {
	constructor(header_img, username, send_time, content_text, comment_num, praise_num, imgs_warpper, praise_list_box_el, comment_box_el, praise_btn_el) {
		this.header_img = header_img;
		this.username = username;
		this.send_time = send_time;
		this.content_text = content_text;
		this.comment_num = comment_num;
		this.praise_num = praise_num;
		this.imgs_warpper = imgs_warpper;
		this.show_PhotoSwipe_arr = [];
		this.praise_list_box_el = praise_list_box_el;
		this.comment_box_el = comment_box_el;
		this.praise_btn_el = praise_btn_el;
	}

	init() {
		this.imgs_warpper.addEventListener('click', (e) => {
			this.show_imgs(e);
		}, false);
		this.praise_num.addEventListener('click', () => {
			this.praise_list_box_el.style.display = 'block';
			this.comment_box_el.style.display = 'none';
		}, false);
		this.comment_num.addEventListener('click', () => {
			this.praise_list_box_el.style.display = 'none';
			this.comment_box_el.style.display = 'block';
		}, false);
		this.praise_btn_el.addEventListener('click', () => {
			pariseDynamic(getQueryStringArgs().message_id);
		}, false);
	}

	renderPraiseList(user_arr) {
		console.log(user_arr);
		let str_ = '';
		for(let i = 0, len = user_arr.length; i < len; i ++ ) {
			str_ += `<div class="head_name_item praisewidth" onclick=viewUserIndexPage(${user_arr[i].praiseUserId})><div class="user_head_pic_item"><img src=${user_arr[i].header}></div><div class='comment_content_sign_box'><p class="user_name_item">${user_arr[i].praiseUserName}</p><div class="send_time_item">${user_arr[i].signature}</div></div></div>`
		}
		this.praise_list_box_el.innerHTML = str_;
	}

	render(data) {

		this.header_img.src = data.header;
		this.username.innerHTML = data.username;
		this.send_time.innerHTML = data.time;
		this.content_text.innerHTML = data.contentText;
		this.comment_num.innerHTML = data.commentCount;
		this.praise_num.innerHTML = data.praiseCount;
		this.imgRender(data.contentImages);
		this.praise_btn_el.src = data.isPraise == 0 ? '../../pic/no_praise.png' : '../../pic/praise.png';
	}
	createPhotoswipeArr(img_arr) {
		// 数组长度大于0
		for(let i = 0, len = img_arr.length; i < len; i ++) {
			let img_wh = getBase64ImgWidthHeight(img_arr[i]);
			this.show_PhotoSwipe_arr.push({
				src: img_arr[i],
				w: img_wh.w,
				h: img_wh.h
			});
		}
	}
	imgRender(img_arr) {

		if(img_arr.length == 0) {return}
		this.createPhotoswipeArr(img_arr);
		let str = '';

		for(let i = 0, len = img_arr.length; i < len; i++) {
			let imgwh = getBase64ImgWidthHeight(img_arr[i]);
			let item_str = `<div class="photo_item"><img class=${i} data-size=${imgwh.w}x${imgwh.h} style="width: 100%; height: 100%; object-fit: cover;" src=${img_arr[i]}></div>`;
			str += item_str;
		}
		this.imgs_warpper.innerHTML = str;
		this.adopt_photos_size();
	}

	show_imgs(e) {
		console.log(e.target);
		let index = e.target.classList[0];
		show_PhotoSwipe(this.show_PhotoSwipe_arr, index);
	}

	adopt_photos_size() {
		if(this.imgs_warpper.childElementCount == 1) {this.imgs_warpper.childNodes[0].style.wihth = '99%'; return;}
		let page_width = window.innerWidth;

		if(typeof page_width != 'number') {
			if(document.compatMode == 'CSS1Compat') {
				page_width = document.documentElement.clientWidth;
			} else {
				page_width = document.body.clientWidth;
			}
		}
		let img_height = page_width / 3;
		if(this.imgs_warpper.childElementCount >= 2) {
			for(let i = 0; i < this.imgs_warpper.childElementCount; i++) {
				this.imgs_warpper.childNodes[i].style.width = '33%';
				this.imgs_warpper.childNodes[i].style.height = `${img_height}px`;
			}
		}
	}
}


let mainertext = new MainerText(document.getElementsByClassName('user_head_pic_item')[0].getElementsByTagName('img')[0],
								document.getElementsByClassName('user_name_item')[0],
								document.getElementsByClassName('send_time_item')[0],
								document.getElementsByClassName('item_text')[0],
								document.getElementById('comment_num'),
								document.getElementById('praise_num'),
								document.getElementById('photos_show'),
								document.getElementById('praise_user_list_wrapper'),
								document.getElementById('comment_box_wrapper'),
								document.getElementsByClassName('btn_style')[1]);
mainertext.init();


class Comment_Obj {
	constructor(comment_wrapper) {
		this.comment_wrapper = comment_wrapper;
		this.dynamic_owner_id = null;
	}

	render(comment_arr) {
		console.log(comment_arr)
		if(comment_arr.length == 0) {return}
		var str_ = ''
		for(let i = 0, len = comment_arr.length; i < len; i++) {
			let can_delete = app_user_id == comment_arr[i].sendUserId ? 'true' : 'false';
			if(app_user_id) 
			console.log(can_delete)
			let reply_style = comment_arr[i].firstReplyUser ? 'block' : 'none';
			str_ += `<div class="comment_item_wrapper">
						<div class="comment_item_header" onclick=viewUserIndexPage(${comment_arr[i].sendUserId})>
							<div class="comment_img_wrapper "><img src=${comment_arr[i].header}></div>
							<div class="comment_item_name">${comment_arr[i].sendUsername}</div>
							
						</div>
						<div class="comment_item_mainer">
							<div class="comment_item_mainer_text" onclick=replyComment(${comment_arr[i].commentId},${comment_arr[i].sendUserId},${can_delete})>
								<span>${comment_arr[i].content}</span>
							</div>
							<div class="comment_item_reply" style="display: ${reply_style};" onclick=showCommentReply(${comment_arr[i].commentId},${comment_arr[i].sendUserId},${comment_arr[i].sendUserId})>
								<div class="reply_item">
									<a class="reply_user_name">${comment_arr[i].firstReplyUser}</a>
									<span> :</span>
									<div class="reply_content">${comment_arr[i].firstReplyContent}</div>
								</div>
							</div>
							<div class="comment_item_time">${comment_arr[i].time}</div>
						</div>
					</div>`;
		}
		this.comment_wrapper.innerHTML = str_;
	}

}



let comment_obj = new Comment_Obj(document.getElementById('comment_box_wrapper'));

// 获取该动态的评论信息
promiseAjax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/message/getMessageById.do',
	type: 'get',
	data: {
		messageId: getQueryStringArgs(window.location.search).message_id
	},
	send_form: false,
	async: false
}).then((responesText) => {
	let json = JSON.parse(responesText);
	console.log(json);
	app_user_id = json.data.userId;
	mainertext.render(json.data);
}).catch((err) => {
	// let json = JSON.parse(err);
	console.log(err);
});


// 获取该动态的点赞信息并提前渲染
promiseAjax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/comment/getMessAllComments.do',
	type: 'get',
	data: {
		messageId: getQueryStringArgs(window.location.search).message_id
	},
	send_form: false,
	async: false
}).then((value) => {
	value = JSON.parse(value);
	console.log(value);
	comment_obj.render(value.data);
});
promiseAjax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/message/getPraiseUsers.do',
	type: 'get',
	data: {
		messageId: getQueryStringArgs().message_id
	},
	async: false
}).then((value) => {
	value = JSON.parse(value);
	mainertext.renderPraiseList(value.data);
}).catch((err)=> {
	console.log(err);
});