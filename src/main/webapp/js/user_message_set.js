
import {window_addEvent, setSessionBack} from './setSessionBackRefresh.js'
import {Ajax, promiseAjax} from './AJAX.js'
import {getBase64ImgWidthHeight} from './getBase64ImgWidthHeight.js'
import show_photoswipe from './PhotoSwipe_way.js'
class App {


	constructor(return_btn, send_btn, username, signature, headSculpture) {
		this.return_btn = return_btn;
		this.send_btn = send_btn;
		this.user_message = {
			username : username,
			signature : signature,
			headSculpture : headSculpture
		}
	}

	init() {
		this.return_btn.addEventListener('click', () => {
			window.history.back();
		}, false);
		this.send_btn.addEventListener('click', () => {
			this.sendAjax();
		}, false);

	}
	render(data) {
		this.user_message.username.value = data.username;
		this.user_message.signature.value = data.signature;
		this.user_message.headSculpture.src = data.headSculpture;
	}
	sendAjax() {
		promiseAjax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/user/update.do',
			type: 'post',
			data: {
				username : this.user_message.username.value,
				signature : this.user_message.signature.value
			},
			send_form: true,
			async: false
		}).then((value) => {
			let json = JSON.parse(value);
			console.log(json);
			setSessionBack();
		}).catch((err) => {
			let json = JSON.parse(err);
			console.log(json);
		});
	}
}

const app = new App(document.getElementById('return_btn'),
					document.getElementById('send_btn'),
					document.getElementById('user_name_text'),
					document.getElementById('user_sign_text'),
					document.getElementsByClassName('img_style'));
app.init();
function createXhr() {
	if(typeof XMLHttpRequest != 'undefined') {
		createXhr = function() {
			return new XMLHttpRequest();
		}
	} else if(typeof ActiveXObject != 'undefined'){
		createXhr = function () {
			if (typeof arguments.callee.activeXString != 'string')  {
				var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
				var i, len;
				for (i = 0, len = versions.length; i < len; i ++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
							break;
					} catch(ex) {

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}

	} else {
		createXhr = function() {
			throw new Error('No XHR object available.');
		}
	}
	return createXhr();
}


Ajax({
	url: 'http://118.31.12.175:8080/xiyouProject_war/user/get_user_info.do',
	type: 'get',
	data: {
	},
	send_form: false,
	async: false,
	success: (responesText) => {
		let json = JSON.parse(responesText);
		console.log(json)
		app.render(json.data)
	},
	fail: (err) => {
		err = JSON.parse(err);
		console.log(err);
	}
})