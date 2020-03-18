import {Ajax} from 'http://localhost:9012/js/AJAX.js'
import show_PhotoSwipe from 'http://localhost:9012/js/PhotoSwipe_way.js'
import {getBase64ImgWidthHeight} from 'http://localhost:9012/js/getBase64ImgWidthHeight.js'
import {setSessionBack} from 'http://localhost:9012/js/setSessionBackRefresh.js'
class APP {
	constructor(el, return_btn, choose_btn, photos_show, upload_imgs, send_btn) {
		this.el = el;
		this.return_btn = return_btn;
		this.choose_btn = choose_btn;
		this.photos_show = photos_show;
		this.upload_imgs = upload_imgs;
		this.send_btn = send_btn;
		this.photo_display = false;
		this.photos_add = [];
		this.assist_var = {
			timer : null,
			count: 0,
			wait_show_photo: [],
			timer2
		}
	}

	init() {
		this.choose_btn.addEventListener('click', (e) => {
			this.handle_choose_Click(e);
		}, false);

		// this.upload_imgs.addEventListener('click', () => {
		// 	// 调用安卓注入的方法
		// 	window.android.getphoto();
		// }, false);
		this.return_btn.addEventListener('click', () => {
			window.history.back()
		}, false);
		this.send_btn.addEventListener('click', () => {
			// 直接将属性添加到对象的 动态信息属性上
			// this.getDtMessage();
			if(!this.assist_var.timer2) {
				this.send_message();
				setTimeout(() => {
					clearTimeout(this.assist_var.timer2);
					this.assist_var.timer2 = null;
				}, 2000);
			}

		}, false);
		// 将input标签选中的图片添加到页面中
		this.upload_imgs.onchange = () => {
			handleFiles(this.upload_imgs.files);
		};

		// 单击查看图片，双击取消图片
		this.photos_show.addEventListener('click', (e) => {
			// this.remove_photo(e);
			this.assist_var.count++;
			if(this.assist_var.timer == null) {
				this.assist_var.timer = setTimeout(() => {
					if(this.assist_var.count > 1) {
						//双击及三击四击..以上事件
						this.remove_photo(e);
						this.assist_var.timer = null;
					} else {
						// 单击事件
						this.show_imgs(e);
						this.assist_var.timer = null;
					}
				}, 250);
			}
		}, false);
	}

	// 将e对应的目标放大
	show_imgs(e) {
		console.log(e.target)
		this.assist_var.count = 0;
		// 参数为需要展示的数组
		let index = e.target.classList[0] - 1;
		let items = [];
		for(let i = 0, len = this.assist_var.wait_show_photo.length; i < len; i ++) {
			// 得到base64编码的图片的宽和高
			let img_wh = getBase64ImgWidthHeight(this.assist_var.wait_show_photo[i]);
			items.push({
				src: this.assist_var.wait_show_photo[i],
				w: img_wh.w,
				h: img_wh.h
			})

		}
		show_PhotoSwipe(items, index);
	}

	remove_photo(e) {
		this.assist_var.count = 0;
		let index = e.target.classList[0];
		console.log(index);
		// 将该图片从待发送数组中删除
		this.photos_add.splice(index, 1);
		this.assist_var.wait_show_photo.splice(index, 1);
		// 将display 改变
		e.target.parentNode.style.display = 'none';
	}

	send_message () {
		// 判断格式是否正确
		if(!this.check()) {
			return;
		}
		this.send_Ajax();
	}

	//判断格式是否正确
	check() {
		if(document.getElementsByTagName('textarea')[0].value == '' && this.upload_imgs.files.length == 0) {
			console.log('照片和文字不能同时为空');
			return false;
		}
		return true;
	}

	getDtMessage() {
		console.log(document.getElementsByTagName('textarea')[0].value);
		console.log(this.add_photos);
		this.Dt_message.append('contentText', document.getElementsByTagName('textarea')[0].value);

		this.Dt_message.append('upload_file', this.upload_imgs.files[0]);
		// this.Dt_message.send_time = new Date();
		// console.log(this.Dt_message);
	}
	// galleryImgs() {
	// 	console.log('从相册中选取多张照片');
	// 	plus.grallery.pick(function (e) {
	// 		// 成功的回调函数
	// 		for(var i in e.files) {
	// 			console.log(e.files[i]);
	// 		}
	// 	}, function(e) {
	// 		// 失败的回调函数
	// 		console.log('取消选择图片');
	// 	}, {
	// 		filter: "image",
	// 		multiple: true
	// 	});
	// }s
	handle_choose_Click(e) {
		let target = e.target;

		if(target.classList.contains('is_choose') || target == this.choose_btn){
			// 如果是如果被点击的选项已经被选择， 则直接返回
			return
		} else {
			// 清除被选中的格式
			for(let i = 0; i < 3; i ++) {
				if(this.choose_btn.childNodes[i].classList.contains('is_choose')) {
					this.choose_btn.childNodes[i].classList.remove('is_choose');
				}
			}

			// 为被选中的添加class

			target.classList.add('is_choose');
		}
	}

	// 调整显示照片的尺寸
	adopt_photos_size() {

		if(this.photos_show.childElementCount == 1) this.photos_show.childNodes[0].style.wihth = '99%';

		if(this.photos_show.childElementCount >= 2) {
			for(let i = 0; i < this.photos_show.childElementCount; i++) {
				this.photos_show.childNodes[i].style.width = '33%';
			}
		}
	}

	send_Ajax() {
		Ajax({
			url: 'http://118.31.12.175:8080/xiyouProject_war/message/add.do',
			type: 'post',
			send_form: true,
			data: {
				contentText: document.getElementsByTagName('textarea')[0].value,
				upload_file: this.photos_add
			},
			success: (responeText) => {
				let json = JSON.parse(responeText);
				console.log(json);
				setSessionBack()
			},
			fail: function(err) {
				console.log(err);
				alert('错误' + err);
			}
		});
	}

}

var App = new APP(document.getElementById('app'),
				 document.getElementById('return_btn'),
				 document.getElementById('choose_open'),
				 document.getElementById('photos_show'),
				 document.getElementById('upload_imgs'),
				 document.getElementById('send_btn'));

App.init();

function render(argument) {

}

function handleFiles(files) {
	if(files.length) {
		files = Array.prototype.slice.call(files);
		for(let i = 0, len = files.length; i < len; i ++) {
			let file = files[i];
			let reader = new FileReader();
			reader.onload = function() {
				//以base64格式将图片的编码添加到img的src中
				App.photos_add.push(file);
				App.photos_show.innerHTML += `<div class="photo_item"><img class="${App.photos_add.length}" style="width: 100%; height: 100%; z-index: -10;" src=${reader.result}></div>`;
				App.adopt_photos_size();
				App.assist_var.wait_show_photo.push(this.result);
			}
			reader.readAsDataURL(file);
		}
	}
}

