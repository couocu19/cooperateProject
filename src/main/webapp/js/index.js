
class Obj{
	constructor(nav_item) {
		this.nav_item = nav_item;
	}

	init() {
		this.nav_item.addEventListener('click', (e) => {
			this.handleNavClick(e);
		}, false);
	}
	// 渲染页面函数
	render(data) {
		
	}


	handleNavClick(e) {
		let target = e.target;

		if(target.classList.contains('cur') || target == this.nav_item) {
			// 如果未点击上按钮或点击的按钮已经被选择，则直接退出
			return;
		}

		for(let i = 0; i < this.nav_item.childElementCount; i++) {
			this.nav_item.childNodes[i].classList.remove('cur');
		}

		target.classList.add('cur');
		//执行渲染函数
		this.sendAjax();
	}

	sendAjax() {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if(xhr.readystate == 4) {
				if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
					// 正确的处理
					let json = JSON.prase(xhr.responseText);

				}	
			}
		}
	}
}



var obj = new Obj(document.getElementsByClassName('nav_item')[0]);
obj.init();