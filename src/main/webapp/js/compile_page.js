
class App {
	constructor(el, return_btn, choose_btn, photos_show, upload_imgs, send_btn) {
		this.el = el;
		this.return_btn = return_btn;
		this.choose_btn = choose_btn;
		this.photos_show = photos_show;
		this.upload_imgs = upload_imgs;
		this.send_btn = send_btn;
		this.photo_display = false;

	}

	init() {
		this.choose_btn.addEventListener('click', (e) => {
			this.handle_choose_Click(e);
		}, false);
		
		this.upload_imgs.addEventListener('click', () => {
			// 调用安卓注入的方法
			window.android.getphoto();
		}, false);
		this.return_btn.addEventListener('click', () => {
			window.history.back();
		}, false);
		this.send_btn.addEventListener('click', () => {
			let dt_message = this.getDtMessage();
			
		}, false);
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
		if(this.photos_show.childElementCount == 2) {
			this.photos_show.childNodes[0].style.width = '99%';
			this.photos_show.childNodes[1].style.width = '99%';
		}
		if(this.photos_show.childElementCount >= 3) {
			for(let i = 0; i < this.photos_show.childElementCount; i++) {
				this.photos_show.childNodes[i].style.width = '33%';
			}
		}
	}
}

var app = new App(document.getElementById('app'), 
				 document.getElementById('return_btn'),
				 document.getElementById('choose_open'),
				 document.getElementById('photos_show'),
				 document.getElementById('upload_imgs'),
				 document,getElementById('send_btn'));
app.init();

