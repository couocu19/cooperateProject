package com.xiyou.service.impl;

import com.xiyou.common.ServletResponse;
import com.xiyou.dao.CommentMapper;
import com.xiyou.pojo.Comment;
import com.xiyou.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("iCommentService")
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentMapper commentMapper;

    public ServletResponse<Comment> addCommentToMessage(Comment comment){
        int rowCount = commentMapper.insertSelective(comment);
        if(rowCount>0){
            return ServletResponse.createBySuccess(comment);
        }
        return ServletResponse.createByErrorMessage("评论失败!");
    }





}
