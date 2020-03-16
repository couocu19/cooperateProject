package com.xiyou.controller.protal;


import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Comment;
import com.xiyou.pojo.Reply;
import com.xiyou.pojo.User;
import com.xiyou.service.ICommentService;
import com.xiyou.service.IReplyService;
import com.xiyou.vo.ReplyVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import javax.xml.ws.http.HTTPBinding;
import java.util.Date;

@Controller
@RequestMapping("/reply/")
public class ReplyController {

    @Autowired
    private IReplyService iReplyService;


    @ResponseBody
    @RequestMapping("addToComment.do")
    public ServletResponse<ReplyVo> addReplyToComment(HttpSession session, String content, Integer commentId, Integer receiveUserId) {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user == null) {
            return ServletResponse.createByError();
        }

        Reply reply = new Reply();
        reply.setContent(content);
        reply.setCommentId(commentId);
        reply.setSendUserId(user.getId());
        reply.setReceiveUserId(receiveUserId);
        Date time = new Date();
        reply.setTime(time);
        reply.setIsDeleted(true);
        return iReplyService.addReplyToComment(reply);

    }

    //todo:待测试
    @ResponseBody
    @RequestMapping("delete.do")
    public ServletResponse<String> deleteReply(HttpSession session, Integer replyId) {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user == null) {
            return ServletResponse.createByError();
        }
        Integer userId = user.getId();
        return iReplyService.deleteReply(replyId, userId);

    }





}
