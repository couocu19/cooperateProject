class Pop_box {
  constructor(
    pop_el,
    pop_send_el,
    pop_report_el,
    pop_cancel_el,
    pop_delete_el
  ) {
    this.pop_el = pop_el;
    this.pop_send_el = pop_send_el;
    this.pop_report_el = pop_report_el;
    this.pop_cancel_el = pop_cancel_el;
    this.pop_delete_el = pop_delete_el;
  }
  init() {
    this.pop_cancel_el.addEventListener(
      "click",
      () => {
        this.pop_el.style.display = "none";
      },
      false
    );
    this.pop_report_el.addEventListener(
      "click",
      () => {
        console.log("举报");
      },
      false
    );
  }
}

let pop_obj = new Pop_box(
  document.getElementById("pop_box"),
  document.getElementById("pop_send"),
  document.getElementById("pop_report"),
  document.getElementById("pop_cancel_reply"),
  document.getElementById("pop_delete")
);
pop_obj.init();

function replyComment(id, send_user_id, can_delete, type) {
  if (!can_delete) {
    pop_obj.pop_delete_el.style.display = "none";
  }
  pop_obj.pop_delete_el.addEventListener(
    "click",
    () => {
      console.log(`删除动态id为${id}的评论`);
      if (type == "reply") {
        deleteReplyFn(id);
      } else {
        deleteCommentFn(id);
      }
    },
    false
  );
  pop_obj.pop_el.style.display = "block";
  pop_obj.pop_send_el.addEventListener(
    "click",
    () => {
      window.location.href = `replyComment.html?commentId=${id}&receiveUserId=${send_user_id}`;
    },
    false
  );
}

function deleteCommentFn(comment_id) {
  promiseAjax({
    url: "http://118.31.12.175:8080/xiyouProject_war/comment/deleteComment.do",
    type: "get",
    data: {
      commentId: comment_id,
    },
    send_form: false,
    async: false,
  }).then((value) => {
    value = JSON.parse(value);
    if (value.status == 0) {
      window.location.reload();
    }
  });
}

function showCommentReply(commentId, app_user_id, dynamic_owner_id) {
  window.location.href = `showReplyList.html?commentId=${commentId}&app_user_id=${app_user_id}&dynamic_owner_id=${dynamic_owner_id}`;
}

function deleteReplyFn(reply_id) {
  promiseAjax({
    url: "http://118.31.12.175:8080/xiyouProject_war/reply/delete.do",
    type: "get",
    data: {
      replyId: reply_id,
    },
    send_form: false,
    async: false,
  }).then((value) => {
    value = JSON.parse(value);
    if (value.status == 0) {
      window.location.reload();
    }
  });
}
