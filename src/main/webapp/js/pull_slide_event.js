

function AddpullUp(text_dom, el_dom, callback) {
	let start_pos = 0,  //记录开始的位置
		move_distant = 0;

	el_dom.addEventListener('touchstart', (e) => {

		text_dom.style.display = 'block';
		start_pos = e.touches[0].pageY;

	}, false);

	el_dom.addEventListener('touchmove', (e) => {
		// 得到下拉的距离
		move_distant = e.touches[0].pageY - start_pos;

		if(move_distant > 0 && move_distant < 60) {
			// 提示下拉刷新
			if(move_distant > 40) {
				text_dom.innerHTML = '下拉刷新';

				el_dom.style.position = 'relative';
				el_dom.style.transition = 'transform 0s';
			}
			el_dom.style.transform = `translateY(${move_distant - 20}px)`;
			// 如果下拉距离足够，则提示释放
			if(move_distant > 50) {
				text_dom.innerHTML = '释放刷新';
			}
		}
	}, false);
	el_dom.addEventListener('touchend', (e) => {
		setTimeout(() => {
			text_dom.style.display = 'none';
			text_dom.innerHTML = '';
		}, 1000);
		el_dom.style.transition = 'transform 0.5s ease 1s';
		el_dom.style.transform = 'translateY(0px)';
		if(move_distant > 50) {
			text_dom.innerHTML = '更新中...';
		}


	}, false);
}
function AddSlideUp(text_dom, el_dom, callback, data) {
	// 获取当前滚动条的位置

	window.onscroll = function() {

		let scrollTop = getScrollTop();
		// 获取当前可视范围内的高度
		let cilentHeight = getCilentHeight();
		// 获取文档的完整高度
		let AllHeight = getScrollHeight();
		console.log(scrollTop, cilentHeight, AllHeight);
		if(scrollTop + cilentHeight >= AllHeight - 20) {
			text_dom.style.opacity = 1;
			text_dom.innerHTML = '加载中...';
			// 此处添加滚动条事件的节流函数
			throttle(callback, data);
			setTimeout(() => {
				text_dom.style.opacity = 0;
			}, 500);
		}
	}
}
let throttle_var = null;
function throttle(callback, data) {
	clearTimeout(throttle_var);
	throttle_var = setTimeout(() => {
		console.log('callback 执行')
		callback(data);
	}, 300);
}


function getScrollTop() {
    return document.documentElement.scrollTop;
}


function getCilentHeight() {
	let cilentHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
        cilentHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    }
    else {
        cilentHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return cilentHeight;
}

function getScrollHeight(argument) {
	return document.body.scrollHeight >  document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
}
export {AddpullUp, AddSlideUp};