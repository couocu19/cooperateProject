package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import org.springframework.stereotype.Service;


public interface IMessageService {
    ServletResponse<Message> addMessage(Message message, Content content);
}
