import {Ajax, returnPage} from 'http://localhost:9012/js/AJAX.js'

class App {
	constructor(return_btn, search, send_btn) {
		this.return_btn = return_btn;
		this.search = search;
		this.send_btn = send_btn;
	}
	init() {
		this.return_btn.addEventListener('click', () => {
			returnPage();
		}, false);
		this.send_btn.addEventListener('click', () => {
			this.send_Ajax();
		}, false);
	}


	send_Ajax() {
		if(this.search.value == '') {
			console.log('输入的内容为空');
			return;
		}
		Ajax(this.search.value);
	}


}

const app = new App(document.getElementsByClassName('return_btn')[0],
					document.getElementById('search_name'),
					document.getElementById('send_btn')
	);
app.init();