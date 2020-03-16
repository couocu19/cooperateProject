package com.xiyou.dao;

import com.xiyou.pojo.Praise;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface PraiseMapper {

    int insert(Praise record);
    int insertSelective(Praise record);
    Praise selectByPrimaryKey(@Param(value = "id") Integer id);
    int updateStatus(@Param(value = "id") Integer id,@Param("isCanceled") Boolean isCanceled);
    Praise selectByUserIdAndMessageId(@Param(value = "userId") Integer userId, @Param(value = "messageId")Integer messageId);
    List<Praise> selectByMessageId(Integer messageId);
}
