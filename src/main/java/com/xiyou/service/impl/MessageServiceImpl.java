package com.xiyou.service.impl;

import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.ContentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.PraiseMapper;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.Praise;
import com.xiyou.pojo.User;
import com.xiyou.service.IMessageService;
import com.xiyou.util.DateTimeUtil;
import com.xiyou.vo.MessageVo;
import com.xiyou.vo.PraiseVo;
import com.xiyou.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.rmi.ServerError;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service("iMessageService")
public class MessageServiceImpl implements IMessageService {

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private ContentMapper contentMapper;

    @Autowired
    private PraiseMapper praiseMapper;

    @Autowired
    private UserMapper userMapper;

    public ServletResponse<Message> addMessage(Message message, Content content){
        //上传到数据库的规则:先上传message,得到message对应的id,再上传message对应的content
        Date date = new Date();
        message.setTime(date);
        int rowId = messageMapper.insertSelective(message);
        System.out.println(rowId);
        Integer userId = null;
        User user = null;
        if(rowId>0){
            int realId =message.getId();
            content.setMessageId(realId);
            int rowCount = contentMapper.insertSelective(content);
            if(rowCount>0){
                //更新动态总数
                userId = message.getUserId();
                user = userMapper.selectByPrimaryKey(userId);
                Integer messCount = user.getMessageCount();
                messCount++;
                user.setMessageCount(messCount);
                userMapper.updateByPrimaryKeySelective(user);

                message.setContent(content);
                return ServletResponse.createBySuccess(message);
            }
        }

        return ServletResponse.createByErrorMessage("发表失败~");

    }

    public ServletResponse<String> deleteMessage(Integer messageId,Integer currentId){

        Message message = messageMapper.selectByPrimaryKey(messageId);

        if(message!=null){
            Integer userId  = message.getUserId();
            if(userId!= currentId){
                return ServletResponse.createByErrorMessage("没有操作权限~");
            }
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
                    return ServletResponse.createBySuccess("canceled",praise1);
                }
            }else{
            praise.setUserId(userId);
            praise.setMessageId(messageId);
            praise.setCanceled(true);

            int rowCount = praiseMapper.insertSelective(praise);
              if(rowCount>0){
                  return ServletResponse.createBySuccess("ok",praiseCount);
              }
            }
        }

        return ServletResponse.createByErrorMessage("操作失败~");

    }

    //动态取消赞
    public ServletResponse cancelPraise(Integer praiseId,Integer userId){
        Praise praise = praiseMapper.selectByUserIdAndMessageId(userId,praiseId);
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
            int rowCount = praiseMapper.updateStatus(praiseId,praise.getCanceled());
            if(rowCount>0){
                return ServletResponse.createBySuccess("ok",praiseCount);
            }

        }else{
                return ServletResponse.createByErrorMessage("参数错误~");
         }
        }
        return ServletResponse.createByErrorMessage("操作失败~");

    }

    //获取某个动态的点赞列表
    public ServletResponse getPraiseUsers(Integer messageId){
        List<Praise> praises = praiseMapper.selectByMessageId(messageId);
        if(praises!=null && praises.size()!=0){
            List<PraiseVo> praiseVos = new ArrayList<>();
            PraiseVo praiseVo = null;
            for(Praise p:praises){
                praiseVo = assemblePraise(p);
                praiseVos.add(praiseVo);
            }

            return ServletResponse.createBySuccess(praiseVos);
        }

        return ServletResponse.createBySuccessMessage("你的赞是让我最开心的事~");

    }

    public ServletResponse getMessageById(Integer messageId){
        Message message = messageMapper.selectByPrimaryKey(messageId);
        Content content = null;
        if(message!=null){
            content = contentMapper.selectByMessageId(messageId);
            message.setContent(content);
            return ServletResponse.createBySuccess(message);
        }
        return ServletResponse.createByErrorMessage("操作失败");
    }

    //判断是否当前用户是否赞过这个动态
    public Boolean isPraised(Integer userId,Integer messageId){
        Praise praise = praiseMapper.selectByUserIdAndMessageId(userId,messageId);
        if(praise.getCanceled() == false){
            return false;
        }else{
            return true;
        }

    }

    private PraiseVo assemblePraise(Praise praise){
        PraiseVo praiseVo = new PraiseVo();
        praiseVo.setPraiseId(praise.getId());
        praiseVo.setPraiseUserId(praise.getUserId());
        User praiseUser = userMapper.selectByPrimaryKey(praise.getUserId());
        praiseVo.setPraiseUserName(praiseUser.getUsername());
        praiseVo.setSignature(praiseUser.getSignature());
        return praiseVo;
    }



}
