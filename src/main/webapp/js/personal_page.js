


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
