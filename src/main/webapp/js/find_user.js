

class App {
	constructor(return_btn, search, send_btn) {
		this.return_btn = return_btn;
		this.search = search;
		this.send_btn = send_btn;
	}
	init() {
		this.return_btn.addEventListener('click', () => {
			window.history.back();
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


function Ajax(search_name) {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			// 需要进行的操作
		}
	}
}