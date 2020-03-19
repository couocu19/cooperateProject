


class Pop_box {
	constructor(pop_el, pop_send_el, pop_report_el, pop_cancel_el, pop_delete_el) {
		this.pop_el = pop_el;
		this.pop_send_el = pop_send_el;
		this.pop_report_el = pop_report_el;
		this.pop_cancel_el = pop_cancel_el;
		this.pop_delete_el = pop_delete_el;
	}
	init() {
		this.pop_cancel_el.addEventListener('click', () => {
			this.pop_el.style.display = 'none';
		}, false);
	}

}

let pop_obj = new Pop_box(	document.getElementById('pop_box'),
					  		document.getElementById('pop_send'),
						    document.getElementById('pop_report'),
						    document.getElementById('pop_cancel_reply'),
						    document.getElementById('pop_delete'));
pop_obj.init();



function replyComment(comment_id, send_user_id, can_delete) {
	if(!can_delete) {
		pop_obj.pop_delete_el.style.display = 'none';
	}
	pop_obj.pop_delete_el.addEventListener('click', () => {
		console.log(`删除动态id为${comment_id}的评论`);
		deleteCommentFn(comment_id);
	}, false);
	pop_obj.pop_el.style.display = 'block';
	pop_obj.pop_send_el.addEventListener('click', () => {
		window.location.href = `replyComment.html?commentId=${comment_id}&receiveUserId=${send_user_id}`;
	}, false);
}

function deleteCommentFn(comment_id) {
	promiseAjax({
		url: 'http://118.31.12.175:8080/xiyouProject_war/comment/deleteComment.do',
		type: 'get',
		data: {
			commentId : comment_id
		},
		send_form: false,
		async: false
	}).then((value) => {
		value = JSON.parse(value);
		if(value.status == 0) {
			window.location.reload();
		}
	})
}

function showCommentReply(commentId) {
	window.location.href = `showReplyList.html?commentId=${commentId}`;
}

