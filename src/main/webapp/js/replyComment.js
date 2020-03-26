import {Ajax, promiseAjax} from './AJAX.js'
import {getQueryStringArgs} from './getQueryStringArgs.js'
import {setSessionBack} from './setSessionBackRefresh.js'


class Obj {
	constructor(return_el, send_reply_el, value_el) {
		this.return_el = return_el;
		this.send_reply_el = send_reply_el;
		this.value_el = value_el;
		this.timer = null;
	}

	init() {
		this.return_el.addEventListener('click', () => {
			setSessionBack();
		}, false);
		this.send_reply_el.addEventListener('click', () => {
			if(!this.timer) {
				if(this.checkContent()) {
					this.sendRequest();
				}
				// 节流函数
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.timer = null;
				}, 1000);
			}
			
		}, false);
	}

	// 检查格式是否正确
	checkContent() {
		return this.value_el.value.length > 0 ? true : false;
	}

	sendRequest() {
		let args = getQueryStringArgs();
		promiseAjax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/reply/addToComment.do',
			type: 'get',
			data: {
				content: this.value_el.value,
				commentId: args.commentId,
				receiveUserId: args.receiveUserId
			},
			send_from: true,
			async: false
		}).then((value) => {
			setSessionBack();
			console.log(JSON.parse(value))
		});
	}
}


let obj = new Obj(  document.getElementsByClassName('return_btn')[0],
					document.getElementById('send_reply'),
					document.getElementById('reply_content'));

obj.init();