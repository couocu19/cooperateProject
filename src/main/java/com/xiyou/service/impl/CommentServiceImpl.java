package com.xiyou.service.impl;

import com.xiyou.common.ServletResponse;
import com.xiyou.dao.CommentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.ReplyMapper;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.Reply;
import com.xiyou.pojo.User;
import com.xiyou.service.ICommentService;
import com.xiyou.vo.MessageAndCommentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("iCommentService")
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private ReplyMapper replyMapper;

    public ServletResponse<Comment> addCommentToMessage(Comment comment){
        int rowCount = commentMapper.insertSelective(comment);
        if(rowCount>0){
            //动态中的评论数也要加1
            Integer messageId = comment.getMessageId();
            Message message = messageMapper.selectByPrimaryKey(messageId);
            if(message!=null){
                Integer count = message.getCommentCount();
                count++;
                message.setCommentCount(count);
                //todo:修改
                messageMapper.updateByPrimaryKey(message);
            }
            return ServletResponse.createBySuccess(comment);
        }
        return ServletResponse.createByErrorMessage("评论失败!");
    }


    //获取某一条评论的所有回复
    public ServletResponse<List<Reply>> getCommentAllReply(Integer commentId){

        List<Reply> replies = replyMapper.selectByCommentId(commentId);
        if(replies!=null && replies.size()!=0){
            return ServletResponse.createBySuccess(replies);
        }

        return ServletResponse.createByErrorMessage("error");
    }

    //获取某一条评论的第一条回复
    public ServletResponse<Reply> getCommentFirstReply(Integer commentId){
        List<Reply> replies = replyMapper.selectByCommentId(commentId);
        if(replies!=null && replies.size()!=0){
            Reply reply = replies.get(0);
            return ServletResponse.createBySuccess("ok",reply);
        }
        return ServletResponse.createByErrorMessage("empty");
    }


    public ServletResponse<List<Comment>> getAllComment(Integer messageId){
        List<Comment> comments = commentMapper.selectByMessageId(messageId);
        if(comments!=null){
            return ServletResponse.createBySuccess(comments);
        }

        return ServletResponse.createByErrorMessage("快来发表你的评论吧~");

    }

    public ServletResponse praiseComment(Integer commentId){
        Comment comment = commentMapper.selectByPrimaryKey(commentId);
        if(comment!=null){
            Integer praiseCount = comment.getPraiseCount();
            praiseCount++;
            comment.setPraiseCount(praiseCount);

            int rowCount = commentMapper.updateByPrimaryKeySelective(comment);
            if(rowCount>0){
                return ServletResponse.createBySuccess("ok");
            }
        }
        return ServletResponse.createByErrorMessage("操作失败~");

    }

    public ServletResponse<Comment> cancelPraise(Integer commentId,Integer userId){
        Comment comment = commentMapper.selectByPrimaryKey(commentId);
        Integer praiseCount = comment.getPraiseCount();
        Integer id = comment.getUserId();
        if(id!=userId){
            return ServletResponse.createByErrorMessage("没有操作权限~");
        }
        praiseCount--;
        comment.setPraiseCount(praiseCount);
        int rowCount = commentMapper.updateByPrimaryKey(comment);
        if(rowCount>0){
            return ServletResponse.createBySuccess(comment);
        }
        return ServletResponse.createByErrorMessage("error");

    }

    public ServletResponse<String> deleteComment(Integer commentId, User user){
        //判断是否有权限删除
        //动态的userId和要删评论的用户id相同
        //或者评论的userId和要删评论的用户id相同
        Comment comment = commentMapper.selectByPrimaryKey(commentId);
        if(comment!=null){
            System.out.println("不为空");
            Integer messageId = comment.getMessageId();
            Message message = messageMapper.selectByPrimaryKey(messageId);
            if(message!=null){
                System.out.println("不为空1");
                Integer userId = message.getUserId();
                if(userId == user.getId() || comment.getUserId() == user.getId()){
                    comment.setIsDeleted(false);
                    int rowCount = commentMapper.updateByPrimaryKey(comment);
                    if(rowCount>0){
                        System.out.println("不为空2");
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
