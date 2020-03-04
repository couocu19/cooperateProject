package com.xiyou.service.impl;

import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.ContentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.PraiseMapper;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.Praise;
import com.xiyou.service.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service("iMessageService")
public class MessageServiceImpl implements IMessageService {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private ContentMapper contentMapper;

    @Autowired
    private PraiseMapper praiseMapper;

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


    public ServletResponse praiseMessage(Integer messageId,Integer userId){
        Message message = messageMapper.selectByPrimaryKey(messageId);
        Praise praise = new Praise();
        if(message!=null){
            Integer praiseCount = message.getPraisePoints();
            praiseCount++;
            message.setPraisePoints(praiseCount);
            messageMapper.updateByPrimaryKey(message);
            //更新点赞表
            //首先确定此人是否曾经赞过这条动态
            Praise praise1 = praiseMapper.selectByUserIdAndMessageId(userId,messageId);
            if(praise1!=null){
                praise1.setCanceled(true);
                int rowCount = praiseMapper.insertSelective(praise1);
                if(rowCount>0){
                    return ServletResponse.createBySuccess(praise1);
                }
            }else{
            praise.setUserId(userId);
            praise.setMessageId(messageId);
            praise.setCanceled(true);
            int rowCount = praiseMapper.insertSelective(praise);
              if(rowCount>0){
                  return ServletResponse.createBySuccess(praise);
              }
            }
        }

        return ServletResponse.createByErrorMessage("操作失败~");

    }



    //动态取消赞
    public ServletResponse cancelPraise(Integer praiseId,Integer userId){
        Praise praise = praiseMapper.selectByPrimaryKey(praiseId);
        Message message = null;
        if(praise!=null) {
            Integer messageId = praise.getMessageId();
            message = messageMapper.selectByPrimaryKey(messageId);
            if (message != null) {
            Integer praiseCount = message.getPraisePoints();
            praiseCount--;
            message.setPraisePoints(praiseCount);
            messageMapper.updateByPrimaryKey(message);
            praise.setCanceled(false);
            int rowCount = praiseMapper.updateByPrimaryKey(praise);
            if(rowCount>0){
                return ServletResponse.createBySuccessMessage("操作成功");
            }

        }else{
                return ServletResponse.createByErrorMessage("参数错误~");
         }
        }
        return ServletResponse.createByErrorMessage("操作失败~");

    }
}
