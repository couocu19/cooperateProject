
import {promiseAjax} from './AJAX.js'
import {getQueryStringArgs} from './getQueryStringArgs.js'

import {setSessionBack} from './setSessionBackRefresh.js'


class Obj {
	constructor(return_el, reply_box_el) {
		this.return_el = return_el;
		this.reply_box_el = reply_box_el;
		this.can_delete = false;
	}


	init() {
		this.return_el.addEventListener('click', () => {
			setSessionBack();
		}, false);
		this.getData();
		this.initDelete()
	}
	initDelete() {
		if(getQueryStringArgs().app_user_id == getQueryStringArgs().dynamic_owner_id) {
			this.can_delete = true;
		}
	}



	getData() {
		promiseAjax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/comment/getCommentAndReply.do',
			type: 'get',
			data: {
				commentId : getQueryStringArgs().commentId
			},
			async: false
		}).then((value) => {	
			value = JSON.parse(value);
			console.log(value);
			this.render(value.data.replies);
		}).catch((err) => {
			console.log(err);
		});
	}


	render(data_arr) {

		let str_ = ``;
		let appUserId = getQueryStringArgs().app_user_id;
		for(let i = 0, len = data_arr.length; i < len; i ++ ) {
			if(appUserId == data_arr[i].sendReplyUserId) {
				this.can_delete = true;
			}
			str_ += `<div class="comment_item_wrapper">
						<div class="comment_item_header" onclick=viewUserIndexPage(${data_arr[i].sendReplyUserId})>
							<div class="comment_img_wrapper "><img src=${data_arr[i].header}></div>
							<div class="comment_item_name">${data_arr[i].replyUsername}</div>
							<div class="comment_item_time" style="display: none;">${data_arr[i].time}</div>
						</div>
						<div class="comment_item_mainer">
							<div class="comment_item_mainer_text" onclick=replyComment(${data_arr[i].replyId},${data_arr[i].sendReplyUserId},${this.can_delete},'reply')>
								<span>${data_arr[i].content}</span>
							</div>
						</div>
					</div>`;
			this.can_delete = false;
		}
		this.reply_box_el.innerHTML = str_;
	}
}


let obj = new Obj(  document.getElementsByClassName('return_btn')[0],
					document.getElementById('reply_box'));

obj.init();