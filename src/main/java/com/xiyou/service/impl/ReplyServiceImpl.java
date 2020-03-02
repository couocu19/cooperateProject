package com.xiyou.service.impl;

import com.xiyou.common.ServletResponse;
import com.xiyou.dao.ReplyMapper;
import com.xiyou.pojo.Reply;
import com.xiyou.service.IReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("iReplyService")
public class ReplyServiceImpl implements IReplyService {

    @Autowired
    private ReplyMapper replyMapper;

    public ServletResponse<Reply> addReplyToComment(Reply reply){
        int rowCount = replyMapper.insert(reply);
        if(rowCount>0){
            return ServletResponse.createBySuccess(reply);
        }
        return ServletResponse.createByErrorMessage("操作失败~");
    }


}
