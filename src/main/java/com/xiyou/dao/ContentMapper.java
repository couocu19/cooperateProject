package com.xiyou.dao;

import com.xiyou.pojo.Content;
import org.mybatis.spring.annotation.MapperScan;


public interface ContentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Content record);

    int insertSelective(Content record);

    Content selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Content record);

    int updateByPrimaryKey(Content record);
}