

function AddpullUp(text_dom, el_dom_dom, callback) {
	let start_pos = 0,  //记录开始的位置
		move_distant = 0;

	el_dom.addEventListener('touchstart', (e) => {
		start_pos = e.touches[0].pageY;
		el_dom.style.position = 'relative';
		el_dom.style.transition = 'transform 0s';
	}, false);

	el_dom.addEventListener('touchmove', (e) => {
		move_distant = e.pageY - start_pos;
		if(move_distant > 0 && move_distant < 60) {
			el_dom.

		}
	}, false);
}