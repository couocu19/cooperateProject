package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;


public interface IMessageService {
    ServletResponse<Message> addMessage(Message message, Content content);

    ServletResponse<String> deleteMessage(Integer messageId,Integer currentId);

    ServletResponse praiseMessage(Integer messageId,Integer userId);

    ServletResponse cancelPraise(Integer praiseId,Integer userId);

    ServletResponse getPraiseUsers(Integer messageId);

    ServletResponse getMessageById(Integer messageId);

    Boolean isPraised(Integer userId,Integer messageId);

    ServletResponse getAll(HttpSession session);

    ServletResponse getConcernAll(User user);

}
