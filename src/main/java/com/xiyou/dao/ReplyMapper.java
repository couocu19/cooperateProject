package com.xiyou.dao;

import com.xiyou.pojo.Reply;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;


public interface ReplyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Reply record);

    int insertSelective(Reply record);

    Reply selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Reply record);

    int updateByPrimaryKey(Reply record);

    List<Reply> selectByCommentId(Integer commentId);
}