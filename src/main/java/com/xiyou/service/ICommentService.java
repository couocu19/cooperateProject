package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.Reply;
import com.xiyou.pojo.User;

import java.util.List;

public interface ICommentService {

    ServletResponse<Comment> addCommentToMessage(Comment comment);
    ServletResponse praiseComment(Integer commentId);
    ServletResponse<String> deleteComment(Integer commentId, User user);
    ServletResponse<Comment> cancelPraise(Integer commentId,Integer userId);
    ServletResponse<Reply> getCommentFirstReply(Integer commentId);
    ServletResponse<List<Comment>> getAllComment(Integer messageId);

}
