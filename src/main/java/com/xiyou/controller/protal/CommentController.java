package com.xiyou.controller.protal;

import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.User;
import com.xiyou.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Date;

@Controller
@RequestMapping("/comment/")
public class CommentController {

    @Autowired
    private ICommentService iCommentService;

    //给动态评论
    @ResponseBody
    @RequestMapping("addToMessage.do")
    public ServletResponse<Comment> addCommentToMessage(Integer messageId, HttpSession session,String content){
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
        return iCommentService.addCommentToMessage(comment);
    }

    





}
