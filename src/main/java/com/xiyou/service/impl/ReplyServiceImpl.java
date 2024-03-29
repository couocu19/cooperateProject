package com.xiyou.service.impl;

import com.xiyou.common.ServletResponse;
import com.xiyou.dao.CommentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.ReplyMapper;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.Reply;
import com.xiyou.pojo.User;
import com.xiyou.service.IReplyService;
import com.xiyou.util.DateTimeUtil;
import com.xiyou.vo.ReplyVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("iReplyService")
public class ReplyServiceImpl implements IReplyService {

    @Autowired
    private ReplyMapper replyMapper;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private UserMapper userMapper;


    public ServletResponse<ReplyVo> addReplyToComment(Reply reply){
        Integer commentId = reply.getCommentId();
        Comment comment = commentMapper.selectByPrimaryKey(commentId);
        if(comment == null){
            return ServletResponse.createByErrorMessage("该评论不存在或已被删除~");
        }
        if(comment!=null){
            Integer id = comment.getMessageId();
            reply.setMessageId(id);
        }
        int rowCount = replyMapper.insert(reply);
        Message message = null;
        Integer replyCount = 0;
        ReplyVo replyVo = null;
        if(rowCount>0){
            //回复中的回复总数加一
            replyCount = comment.getReplyCount();
            replyCount++;
            comment.setReplyCount(replyCount);
            commentMapper.updateByPrimaryKey(comment);
            //每评论一条动态中的评论总数增加一
            message = messageMapper.selectByPrimaryKey(comment.getMessageId());
            Integer commentCount = message.getCommentCount();
            commentCount++;
            message.setCommentCount(commentCount);
            messageMapper.updateByPrimaryKey(message);
            replyVo = assembleReply(reply);
            return ServletResponse.createBySuccess(replyVo);
        }
        return ServletResponse.createByErrorMessage("操作失败~");
    }

    public ServletResponse<String> deleteReply(Integer replyId,Integer userId){
        Reply reply = replyMapper.selectByPrimaryKey(replyId);
        if(reply!=null){
            Integer sendUserId = reply.getSendUserId();
            Integer messageId = reply.getMessageId();
            Message message = messageMapper.selectByPrimaryKey(messageId);
            Integer id = message.getUserId();
            //判断是否有权限删除动态
            if(sendUserId == userId || userId == id){
                reply.setIsDeleted(false);
                int rowCount = replyMapper.updateByPrimaryKey(reply);
                if(rowCount>0){
                    //每删除一次评论总数减一
                    Integer commentCount = message.getCommentCount();
                    commentCount--;
                    message.setCommentCount(commentCount);
                    messageMapper.updateByPrimaryKey(message);
                    return ServletResponse.createBySuccess("删除成功!");
                }
            }
        }

        return ServletResponse.createByErrorMessage("操作失败!");

    }

    private ReplyVo assembleReply(Reply reply){
        ReplyVo replyVo = new ReplyVo();
        replyVo.setCommentId(reply.getCommentId());
        replyVo.setReplyId(reply.getId());
        replyVo.setReceiveReplyUserId(reply.getReceiveUserId());
        replyVo.setSendReplyUserId(reply.getSendUserId());
        replyVo.setContent(reply.getContent());
        replyVo.setTime(DateTimeUtil.dateToStr(reply.getTime(),DateTimeUtil.STANDARD_FORMAT));
        User user = userMapper.selectByPrimaryKey(reply.getSendUserId());
        replyVo.setReplyUsername(user.getUsername());
        replyVo.setHeader(user.getHeadSculpture());
        User user1 = userMapper.selectByPrimaryKey(reply.getReceiveUserId());
        replyVo.setReceiveReplyUserName(user1.getUsername());
        replyVo.setReceiveReplyUserId(user1.getId());

        return replyVo;

    }

}
