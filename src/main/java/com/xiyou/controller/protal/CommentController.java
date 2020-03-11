package com.xiyou.controller.protal;

import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.CommentMapper;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.ReplyMapper;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.Reply;
import com.xiyou.pojo.User;
import com.xiyou.service.ICommentService;
import com.xiyou.service.IUserService;
import com.xiyou.util.DateTimeUtil;
import com.xiyou.vo.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import javax.xml.ws.http.HTTPBinding;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/comment/")
public class CommentController {

    @Autowired
    private ICommentService iCommentService;
    @Autowired
    private MessageController messageController;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private CommentMapper commentMapper;

    //todo:待测试
    //给动态评论
    @ResponseBody
    @RequestMapping("addToMessage.do")
    public ServletResponse addCommentToMessage(Integer messageId, HttpSession session,String content){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户尚未登录,请先登录~");
        }
        Comment comment = new Comment();
        comment.setMessageId(messageId);
        comment.setUserId(user.getId());
        comment.setConent(content);
        Date date = new Date();
        comment.setTime(date);
        comment.setPraiseCount(0);
        comment.setReplyCount(0);
        //默认评论发表时未删除
        comment.setIsDeleted(true);
        ServletResponse response = iCommentService.addCommentToMessage(comment);
        //如果评论发表成功就返回整个评论列表
        if(response.isSuccess()){
            return getMessageAllComments(session,comment.getMessageId());
        }

        return ServletResponse.createByErrorMessage("发表失败~");
    }


    //给评论点赞
    @ResponseBody
    @RequestMapping("praiseComment.do")
    public ServletResponse praiseComment(Integer commentId,HttpSession session){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户尚未登录,请先登录~");
        }
        return iCommentService.praiseComment(commentId);
    }


    //用户删除评论
    @ResponseBody
    @RequestMapping("deleteComment.do")
    public ServletResponse<String> deleteComment(Integer commentId,HttpSession session){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户尚未登录,请先登录~");
        }
        return iCommentService.deleteComment(commentId,user);
    }


    @ResponseBody
    @RequestMapping("cancelPraise.do")
    public ServletResponse<Comment> cancelPraise(HttpSession session,Integer commentId){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户尚未登录,请先登录~");
        }
        return iCommentService.cancelPraise(commentId,user.getId());
    }

    //查看某个动态的所有评论列表
    @ResponseBody
    @RequestMapping("getMessAllComments.do")
    public ServletResponse<List<CommentVo>> getMessageAllComments(HttpSession session,Integer messageId){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户尚未登录,请先登录~");
        }

        ServletResponse response = iCommentService.getAllComment(messageId);
        if(response.isSuccess()){
            List<CommentVo> commentVos = new ArrayList<>();
            List<Comment> comments = (List<Comment>)response.getData();
            CommentVo commentVo = null;
            for(Comment c: comments){
                    response = iCommentService.getCommentFirstReply(c.getId());
                    if (response.isSuccess()) {
                        Reply reply = (Reply) response.getData();
                        commentVo = assembleCommentAndFirstReply(c, reply);
                        commentVos.add(commentVo);
                    }else{
                        commentVo = assembleComment(c);
                        commentVos.add(commentVo);
                    }
            }

            return ServletResponse.createBySuccess(commentVos);
        }
        return response;

    }


    //查看某一条评论以及下面的回复
    @ResponseBody
    @RequestMapping("getCommentAndReply.do")
    public ServletResponse getCommentAndReply(Integer commentId, HttpSession session){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("登录您的账户,查看更多内容~");
        }

        ServletResponse response = iCommentService.getCommentAllReply(commentId);
        if(response.isSuccess()){
            Comment comment = commentMapper.selectByPrimaryKey(commentId);
            List<Reply> replies = (List<Reply>)response.getData();
            CommentAndReplyVo commentAndReplyVo = assembleCommentAndReply(replies,comment);
            return ServletResponse.createBySuccess(commentAndReplyVo);
        }

        return ServletResponse.createByErrorMessage("null");
    }

    private CommentAndReplyVo assembleCommentAndReply(List<Reply> replies,Comment comment){
        //填充评论信息
        CommentAndReplyVo commentAndReplyVo = new CommentAndReplyVo();

        Integer userId = comment.getUserId();
        User sendUser = userMapper.selectByPrimaryKey(userId);
        String sendUserName = sendUser.getUsername();
        String time = DateTimeUtil.dateToStr(comment.getTime(),DateTimeUtil.STANDARD_FORMAT);
        String header = sendUser.getHeadSculpture();
        String content = comment.getConent();
        Integer praiseCount = comment.getPraiseCount();
        //填充信息
        commentAndReplyVo.setCommentId(comment.getId());
        commentAndReplyVo.setSendUsername(sendUserName);
        commentAndReplyVo.setHeader(header);
        commentAndReplyVo.setTime(time);
        commentAndReplyVo.setContent(content);
        commentAndReplyVo.setPraiseCount(praiseCount);
        //填充评论列表
        ReplyVo replyVo = null;
        User sendReplyUser = null;
        User receiveReplyUser = null;
        List<ReplyVo> replyVos = new ArrayList<>();
        for(Reply r:replies){
            replyVo = new ReplyVo();
            replyVo.setReplyId(r.getId());
            replyVo.setSendReplyUserId(r.getSendUserId());
            replyVo.setContent(r.getContent());
            replyVo.setTime(DateTimeUtil.dateToStr(r.getTime(),DateTimeUtil.STANDARD_FORMAT));

            //获取发送回复的人的信息
            sendReplyUser = userMapper.selectByPrimaryKey(r.getSendUserId());
            String sendReplyUserName = sendReplyUser.getUsername();
            String sendUserHeader = sendReplyUser.getHeadSculpture();
            replyVo.setHeader(sendUserHeader);
            replyVo.setReplyUsername(sendReplyUserName);
            //获取收到恢复的人的用户名
            receiveReplyUser = userMapper.selectByPrimaryKey(r.getReceiveUserId());
            replyVo.setReceiveReplyUserName(receiveReplyUser.getUsername());
            replyVo.setReceiveReplyUserId(r.getReceiveUserId());
            replyVos.add(replyVo);
        }

        commentAndReplyVo.setReplies(replyVos);
        return commentAndReplyVo;

    }

    //如果没有评论回复
    private CommentVo assembleComment(Comment comment){
        CommentVo commentVo = new CommentVo();

        Integer userId = comment.getUserId();
        User sendUser = userMapper.selectByPrimaryKey(userId);
        String sendUserName = sendUser.getUsername();
        String time = DateTimeUtil.dateToStr(comment.getTime(),DateTimeUtil.STANDARD_FORMAT);
        String header = sendUser.getHeadSculpture();
        String content = comment.getConent();
        Integer praiseCount = comment.getPraiseCount();
        //填充信息
        commentVo.setCommentId(comment.getId());
        commentVo.setSendUsername(sendUserName);
        commentVo.setHeader(header);
        commentVo.setTime(time);
        commentVo.setContent(content);
        commentVo.setPraiseCount(praiseCount);

        return commentVo;

    }

    private CommentVo assembleCommentAndFirstReply(Comment comment, Reply firstReply){
        CommentVo commentVo = new CommentVo();

        Integer userId = comment.getUserId();
        User sendUser = userMapper.selectByPrimaryKey(userId);
        String sendUserName = sendUser.getUsername();
        String time = DateTimeUtil.dateToStr(comment.getTime(),DateTimeUtil.STANDARD_FORMAT);
        String header = sendUser.getHeadSculpture();
        String content = comment.getConent();
        Integer praiseCount = comment.getPraiseCount();
        //填充信息
        commentVo.setCommentId(comment.getId());
        commentVo.setSendUsername(sendUserName);
        commentVo.setHeader(header);
        commentVo.setTime(time);
        commentVo.setContent(content);
        commentVo.setPraiseCount(praiseCount);


        User firstReplyUser = userMapper.selectByPrimaryKey(firstReply.getSendUserId());
        String firstReplyUsername = firstReplyUser.getUsername();
        String firstReplyContent = ":"+firstReply.getContent();
        Integer messageId = comment.getMessageId();
        Message message = messageMapper.selectByPrimaryKey(messageId);
        //todo:修改总数
        Integer commentCount = comment.getReplyCount();
        String msg = "共"+commentCount+"条评论回复" ;

        //将以上整理的信息填充到返回的视图对象中
        commentVo.setFirstReplyUser(firstReplyUsername);
        commentVo.setFirstReplyContent(firstReplyContent);
        commentVo.setReplyCountMessage(msg);

        return commentVo;
    }


    private MessageAndCommentVo assembleMessAndComment(Message message, User user, @RequestParam(required = false) List<Comment> comments){
        MessageAndCommentVo messageAndCommentVo = new MessageAndCommentVo();

        MessageVo messageVo = messageController.assembleMessage(message,user);
        messageAndCommentVo.setMessageVo(messageVo);

        List<CommentVo> commentVos = new ArrayList<>();
        ServletResponse response = null;
        if(comments!= null) {
            for (Comment c : comments) {
                response = iCommentService.getCommentFirstReply(c.getId());
                if (response.isSuccess()) {
                    Reply reply = (Reply) response.getData();
                    CommentVo commentVo = assembleCommentAndFirstReply(c, reply);
                    commentVos.add(commentVo);
                }
            }
            messageAndCommentVo.setComments(commentVos);
        }

        return messageAndCommentVo;


    }




}
