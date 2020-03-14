import {Ajax} from 'http://localhost:9012/js/AJAX.js'
import show_PhotoSwipe from 'http://localhost:9012/js/PhotoSwipe_way.js'
import {getBase64ImgWidthHeight} from 'http://localhost:9012/js/getBase64ImgWidthHeight.js'
import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'
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
			window.history.back();
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
		Ajax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/comment/addToMessage.do',
			type: 'post',
			data: {
				messageId : obj.user_message.message_id,
				content: obj.comment_text.value
			},
			send_form: true,
			async: false,
			success: function(responedText) {
				let json = JSON.parse(responedText);
				console.log(json);
			},
			fail: function(err) {
				console.log(err);
			}
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


