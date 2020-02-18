package com.xiyou.dao;

import com.xiyou.pojo.Message;
import org.mybatis.spring.annotation.MapperScan;


public interface MessageMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Message record);

    int insertSelective(Message record);

    Message selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Message record);

    int updateByPrimaryKey(Message record);
}