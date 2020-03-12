import {Ajax} from 'http://localhost:9012/js/AJAX.js'
import show_PhotoSwipe from 'http://localhost:9012/js/PhotoSwipe_way.js'
import {getBase64ImgWidthHeight} from 'http://localhost:9012/js/getBase64ImgWidthHeight.js'
import {getQueryStringArgs} from 'http://localhost:9012/js/getQueryStringArgs.js'
class Obj {
	constructor(return_btn, more_options) {
		this.return_btn = return_btn;
		this.more_options = more_options;
		this.user_message = getQueryStringArgs(location.search);
	}


	init() {
		this.return_btn.addEventListener('click', () => {
			window.history.back();
		}, false);
		console.log(this.user_message);
	}
}


const obj = new Obj(document.getElementsByClassName('return_btn')[0],
					document.getElementsByClassName('set_btn')[0]);
obj.init();
// 得到信息数组
