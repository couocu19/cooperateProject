package com.xiyou.service.impl;

import com.xiyou.common.ServletResponse;
import com.xiyou.dao.CommentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("iCommentService")
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private MessageMapper messageMapper;

    public ServletResponse<Comment> addCommentToMessage(Comment comment){
        int rowCount = commentMapper.insertSelective(comment);
        if(rowCount>0){
            return ServletResponse.createBySuccess(comment);
        }
        return ServletResponse.createByErrorMessage("评论失败!");
    }


    public ServletResponse praiseComment(Integer commentId){
        Comment comment = commentMapper.selectByPrimaryKey(commentId);
        if(comment!=null){
            Integer praiseCount = comment.getPraiseCount();
            praiseCount++;
            comment.setPraiseCount(praiseCount);

            int rowCount = commentMapper.updateByPrimaryKeySelective(comment);
            if(rowCount>0){
                return ServletResponse.createBySuccess();
            }
        }
        return ServletResponse.createByErrorMessage("操作失败~");

    }

    public ServletResponse<String> deleteComment(Integer commentId, User user){
        //判断是否有权限删除
        //动态的userId和要删评论的用户id相同
        //或者评论的userId和要删评论的用户id相同
        Comment comment = commentMapper.selectByPrimaryKey(commentId);
        if(comment!=null){
            Integer messageId = comment.getMessageId();
            Message message = messageMapper.selectByPrimaryKey(messageId);
            if(message!=null){
                Integer userId = message.getUserId();
                if(userId == user.getId() || comment.getUserId() == user.getId()){
                    comment.setIsDeleted(false);
                    int rowCount = commentMapper.updateByPrimaryKey(comment);
                    if(rowCount>0){
                        return ServletResponse.createBySuccess("操作成功！");
                    }
                }else{
                    return ServletResponse.createByErrorMessage("没有操作权限~");
                }
            }

        }

        return ServletResponse.createByErrorMessage("删除失败");



    }




}
