
(function () {
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
				var json = JSON.parse(xhr.responseText);
				console.log(json);
			}
		}
	}
	let url = 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do';
	xhr.open('get', url, false);
	xhr.send(null);
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


function renderUserMessageHeader(data) {
	document
}