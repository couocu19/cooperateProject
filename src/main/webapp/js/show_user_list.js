import {Ajax, promiseAjax} from 'http://localhost:9012/js/AJAX.js'
import {setSessionBack} from 'http://localhost:9012/js/setSessionBackRefresh.js'
import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'


class App {
	constructor(return_btn, show_box) {
		this.return_btn = return_btn;
		this.show_message = getQueryStringArgs();
		this.show_box = show_box;
	}

	init() {
		this.return_btn.addEventListener('click', () => {
			setSessionBack();
		}, false);
		console.log(this.show_message);
		this.getData();
	}

	getData() {
		switch(this.show_message.way) {
			case 'getFansUsers':
				this.sendAjax('http://118.31.12.175:8080/xiyouProject_war/user/getFans.do');
				break;
			case 'getAttentUsers':
				this.sendAjax('http://118.31.12.175:8080/xiyouProject_war/user/getConcernUsers.do')
		}
	}

	sendAjax(send_url) {
		promiseAjax({
			url: send_url,
			type: 'get',
			data: {
				id: this.show_message.id
			},
			async: false
		}).then((value) => {
			value = JSON.parse(value);
			console.log(value);
			this.render(value.data);
		})
	}

	render(data_arr) {
		this.show_box.style.display = 'block';
		if(data_arr == undefined || data_arr.length == 0) {
			this.show_box.innerHTML = '这里什么都没有呢~~~';
			return
		}
		let str_ = '';
		for(let i = 0, len = data_arr.length; i < len; i ++) {
			let item_data = data_arr[i];
			str_ += `<div class="head_name_item" onclick=viewUserIndexPage(${item_data.id})><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.userName}</p><div class="send_time_item">${item_data.signature}</div></div></div>`;
		}
		this.show_box.innerHTML = str_;
	}
}


let app = new App(document.getElementsByClassName('return_btn')[0],
				  document.getElementById('show_box')
	);
app.init();