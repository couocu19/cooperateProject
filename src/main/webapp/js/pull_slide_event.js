

function AddpullUp(text_dom, el_dom, callback) {
	let start_pos = 0,  //记录开始的位置
		move_distant = 0;

	el_dom.addEventListener('touchstart', (e) => {
		start_pos = e.touches[0].pageY;
		el_dom.style.position = 'relative';
		el_dom.style.transition = 'transform 0s';
	}, false);

	el_dom.addEventListener('touchmove', (e) => {
		// 得到下拉的距离
		move_distant = e.touches[0].pageY - start_pos;
		//
		if(move_distant > 0 && move_distant < 60) {
			// 提示下拉刷新
			text_dom.innerHTML = '下拉刷新';
			el_dom.style.transform = `translateY(${move_distant}px)`;
			// 如果下拉距离足够，则提示释放
			if(move_distant > 50) {
				text_dom.innerHTML = '释放刷新';
			}
		}
	}, false);
	el_dom.addEventListener('touchend', (e) => {
		el_dom.style.transition = 'transform 0.5s ease 1s';
		el_dom.style.transform = 'translateY(0px)';
		text_dom.innerHTML = '更新中...';
	}, false);
}

function AddSlideUp() {

}

export {AddpullUp, AddSlideUp};