package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Reply;
import com.xiyou.vo.ReplyVo;

public interface IReplyService {

    ServletResponse<ReplyVo> addReplyToComment(Reply reply);
    ServletResponse<String> deleteReply(Integer replyId,Integer userId);

}
