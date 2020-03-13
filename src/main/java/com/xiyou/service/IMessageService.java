package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import org.springframework.stereotype.Service;


public interface IMessageService {
    ServletResponse<Message> addMessage(Message message, Content content);

    ServletResponse<String> deleteMessage(Integer messageId,Integer currentId);

    ServletResponse praiseMessage(Integer messageId,Integer userId);

    ServletResponse cancelPraise(Integer praiseId,Integer userId);

    ServletResponse getPraiseUsers(Integer messageId);

    ServletResponse getMessageById(Integer messageId);

}
