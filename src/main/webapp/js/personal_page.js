import Ajax from Ajax.js
window.useId = '04192077';
// 立即执行函数，请求用户信息
(function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
				var json = JSON.parse(xhr.responedText)
				renderUserMessage(json);
			}
		}
	}
	let url = '';
	xhr.open('get', url, false);
	xhr.send(null);
	render(data);
})()

class Obj {
	constructor(return_btn, adduser_btn) {
		this.return_btn = return_btn;
		this.adduser_btn = adduser_btn;
	}
	init() {
		this.return_btn.addEventListener('click', () => {
			window.history.back();
		}, false);
	}

}

const obj = new Obj(document.getElementsByClassName('icon_wrapper')[0],
					document.getElementsByClassName('icon_wrapper')[1],
					);
obj.init();


function renderUserMessage(data) {
	// body...

}