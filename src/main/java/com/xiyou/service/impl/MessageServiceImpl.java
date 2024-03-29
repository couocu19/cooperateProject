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
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.rmi.ServerError;
import java.util.ArrayList;
import java.util.Collection;
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
            //更新动态总数
            User user = userMapper.selectByPrimaryKey(userId);
            Integer count = user.getMessageCount();
            count--;
            user.setMessageCount(count);
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
        if(message == null){
            return ServletResponse.createByErrorMessage("该动态不存在或者已被删除");
        }
        Integer praiseCount = message.getPraisePoints();
        //首先确定此人是否曾经赞过这条动态
        Praise praise1 = praiseMapper.selectByUserIdAndMessageId(userId,messageId);
        if(praise1!=null){
            //该用户已经赞过该动态
            if(praise1.getCanceled()!=false) {
                praise1.setCanceled(false);
                int rowCount = praiseMapper.updateStatus(praise1.getId(), praise1.getCanceled());
                if (rowCount > 0) {
                    praiseCount--;
                    message.setPraisePoints(praiseCount);
                    messageMapper.updateByPrimaryKey(message);
                    return ServletResponse.createBySuccess("canceled", praiseCount);
                }
            }else{
                //该用户已经取消赞
                praise1.setCanceled(true);
                int rowCount = praiseMapper.updateStatus(praise1.getId(), praise1.getCanceled());
                if (rowCount > 0) {
                    praiseCount++;
                    message.setPraisePoints(praiseCount);
                    messageMapper.updateByPrimaryKey(message);
                    return ServletResponse.createBySuccess("ok", praiseCount);
                }
            }
        }

        Praise praise = new Praise();
        praise.setUserId(userId);
        praise.setMessageId(messageId);
        praise.setCanceled(true);
        int rowCount = praiseMapper.insertSelective(praise);
        if(rowCount>0){
            praiseCount++;
            message.setPraisePoints(praiseCount);
            messageMapper.updateByPrimaryKey(message);
            return ServletResponse.createBySuccess("ok",praiseCount);
        }

        return ServletResponse.createByErrorMessage("操作失败~");
    }

    //动态取消赞
    public ServletResponse cancelPraise(Integer messageId,Integer userId){
        Praise praise = praiseMapper.selectByUserIdAndMessageId(userId,messageId);
        Message message = null;
        if(praise == null){
            return ServletResponse.createByErrorMessage("error(-还未点过赞)");
        }
        message = messageMapper.selectByPrimaryKey(messageId);
        if (message != null) {
            Integer praiseCount = message.getPraisePoints();
            //目前的状态已经取消赞
            if(praise!=null && praise.getCanceled() == false){
                praise.setCanceled(true);
                int rowCount = praiseMapper.updateStatus(praise.getId(), praise.getCanceled());
                if (rowCount > 0) {
                    praiseCount++;
                    message.setPraisePoints(praiseCount);
                    messageMapper.updateByPrimaryKey(message);
                    return ServletResponse.createBySuccess("praise", praiseCount);
                }
            }

            praiseCount--;
            message.setPraisePoints(praiseCount);
            messageMapper.updateByPrimaryKey(message);

            praise.setCanceled(false);
            int rowCount = praiseMapper.updateStatus(praise.getId(),praise.getCanceled());
            if(rowCount>0){
                return ServletResponse.createBySuccess("ok",praiseCount);
            }

        }else{
                return ServletResponse.createByErrorMessage("参数错误~");
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

    public ServletResponse getAll(HttpSession session){
        List<Message> allMessageList = messageMapper.selectAll();
        if(allMessageList == null){
            return ServletResponse.createByErrorMessage("暂时没有最新动态哦~");
        }
        List<MessageVo> messageVos = new ArrayList<>();
        MessageVo messageVo = null;
        for(Message m:allMessageList){
            messageVo = assembleMessage(m,session);
            messageVos.add(messageVo);
        }

        return ServletResponse.createBySuccess(messageVos);
    }


    public ServletResponse getConcernAll(User user){
        String concerns = user.getConcernUsers();
        if(concerns == null){
            return ServletResponse.createByErrorMessage("这里空空如也,你还没有关注任何人哦~");
        }
        System.out.println(concerns);
        String[] cons = concerns.split(",");
        Integer id = null;
        Message message = null;
        List<Message> allList = new ArrayList<>();
        List<Message> list = null;

        for(int i =1;i<cons.length;i++){
            id = Integer.valueOf(cons[i]);
            //获取关注用户的一个动态
            list = messageMapper.getUserAllMessage(id);
            if(list.size()>0){
                for(Message m:list){
                    allList.add(m);
                }
            }
        }
        if(list.size() == 0){
            return ServletResponse.createByErrorMessage("Ta们还没发过任何动态~");
        }

        return ServletResponse.createBySuccess(allList);

    }

    //判断是否当前用户是否赞过这个动态
    public Boolean isPraised(Integer userId,Integer messageId){
        Praise praise = praiseMapper.selectByUserIdAndMessageId(userId,messageId);
        if(praise == null){
            return false;
        }
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
        praiseVo.setHeader(praiseUser.getHeadSculpture());
        return praiseVo;
    }

    public MessageVo assembleMessage(Message message, HttpSession session){
        User user = userMapper.selectByPrimaryKey(message.getUserId());
        MessageVo messageVo = new MessageVo();
        String username = user.getUsername();

        messageVo.setMessageId(message.getId());
        messageVo.setUserId(user.getId());
        messageVo.setUsername(username);
        messageVo.setHeader(user.getHeadSculpture());
        messageVo.setTime(DateTimeUtil.dateToStr(message.getTime(),"yyyy-MM-dd HH:mm:ss"));
        if(message.getContent().getContentText()!=null){
            messageVo.setContentText(message.getContent().getContentText());
        }

        if(message.getContent().getContentImages()!=null){
            String[] images = message.getContent().getContentImages().split(",");
            List<String> list = new ArrayList<>();
            for(int i = 1;i<images.length;i++){
                list.add(images[i]);
            }
            messageVo.setContentImages(list);
        }
        if(message.getContent().getContentVideos()!=null){
            String[] video = message.getContent().getContentVideos().split(",");
            messageVo.setContentVideos(Const.urlPrefix+"uploadVideo/"+video[1]);
        }
        if(message.getPraisePoints() == null) {
            messageVo.setPraiseCount(0);
        }else{
            messageVo.setPraiseCount(message.getPraisePoints());
        }
        if(message.getPraisePoints() == null) {
            messageVo.setCommentCount(0);
        }else{
            messageVo.setCommentCount(message.getCommentCount());
        }

        //判断当前用户有没有登录
        User curUser = (User) session.getAttribute(Const.CURRENT_USER);
        if(curUser == null){
            messageVo.setIsPraise(0);
        }else{
            Integer id = curUser.getId();
            //填充当前的点赞信息
             Boolean isPraise = isPraised(id,message.getId());
             if(isPraise == true){
                messageVo.setIsPraise(1);
           }else{
                messageVo.setIsPraise(0);

           }
        }
        return messageVo;

    }



}
