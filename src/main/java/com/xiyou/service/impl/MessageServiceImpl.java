package com.xiyou.service.impl;

import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.ContentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import com.xiyou.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.Date;

@Service("iMessageService")
public class MessageServiceImpl implements IMessageService {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private ContentMapper contentMapper;

    public ServletResponse<Message> addMessage(Message message, Content content){
        //上传到数据库的规则:先上传message,得到message对应的id,再上传message对应的content

        Date date = new Date();
        message.setTime(date);
        int rowId = messageMapper.insertSelective(message);
        System.out.println(rowId);
        if(rowId>0){
            int realId =message.getId();
            content.setMessageId(realId);
            int rowCount = contentMapper.insertSelective(content);
            System.out.println(content.getMessageId());
            System.out.println(rowCount);

            if(rowCount>0){
                message.setContent(content);
                return ServletResponse.createBySuccess(message);
            }
        }

        return ServletResponse.createByErrorMessage("发表失败~");

    }



    public ServletResponse<String> deleteMessage(Integer messageId){

        Message message = messageMapper.selectByPrimaryKey(messageId);

        if(message!=null){
            message.setDeleted(false);
            int rowCount =  messageMapper.updateByPrimaryKeySelective(message);
            if(rowCount>0){
                return ServletResponse.createBySuccessMessage("删除成功!");
            }
        }

        return ServletResponse.createByErrorMessage("删除失败~");
    }


}
