package com.xiyou.dao;

import com.xiyou.pojo.User;
import org.mybatis.spring.annotation.MapperScan;


public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    User checkLogin(String studyId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int selectByStudentId(String studentId);


}