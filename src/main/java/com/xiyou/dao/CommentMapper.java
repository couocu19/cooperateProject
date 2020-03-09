package com.xiyou.dao;

import com.xiyou.pojo.Comment;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;


public interface CommentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Comment record);

    int insertSelective(Comment record);

    Comment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKey(Comment record);

    List<Comment> selectByMessageId(Integer messageId);
}