package com.xiyou.dao;

import com.xiyou.pojo.Praise;
import org.apache.ibatis.annotations.Param;


public interface PraiseMapper {

    int insert(Praise record);
    int insertSelective(Praise record);
    Praise selectByPrimaryKey(Integer id);
    int updateByPrimaryKey(Praise record);
    Praise selectByUserIdAndMessageId(@Param(value = "userId") Integer userId, @Param(value = "messageId")Integer messageId);

}
