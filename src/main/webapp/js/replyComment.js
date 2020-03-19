import {Ajax, promiseAjax} from 'http://localhost:9012/js/AJAX.js'
import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'
import {setSessionBack} from 'http://localhost:9012/js/setSessionBackRefresh.js'


class Obj {
	constructor(return_el, send_reply_el, value_el) {
		this.return_el = return_el;
		this.send_reply_el = send_reply_el;
		this.value_el = value_el;
	}

	init() {
		this.return_el.addEventListener('click', () => {
			setSessionBack();
		}, false);
		this.send_reply_el.addEventListener('click', () => {
			if(this.checkContent()) {
				this.sendRequest();
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
			console.log(JSON.parse(value))
		});
	}
}


let obj = new Obj(  document.getElementsByClassName('return_btn')[0],
					document.getElementById('send_reply'),
					document.getElementById('reply_content'));

obj.init();