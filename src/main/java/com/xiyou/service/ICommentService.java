package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.User;

public interface ICommentService {

    ServletResponse<Comment> addCommentToMessage(Comment comment);
    ServletResponse praiseComment(Integer commentId);
    ServletResponse<String> deleteComment(Integer commentId, User user);
}
