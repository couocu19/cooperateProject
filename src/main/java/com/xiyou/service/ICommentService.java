package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Comment;

public interface ICommentService {

    ServletResponse<Comment> addCommentToMessage(Comment comment);
}
