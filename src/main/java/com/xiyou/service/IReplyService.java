package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Reply;

public interface IReplyService {

    ServletResponse<Reply> addReplyToComment(Reply reply);
    ServletResponse<String> deleteReply(Integer replyId,Integer userId);

}
