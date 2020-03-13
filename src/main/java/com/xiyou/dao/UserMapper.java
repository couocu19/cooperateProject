package com.xiyou.dao;

import com.xiyou.pojo.User;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;


public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    User checkLogin(String studentId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int selectByStudentId(String studentId);

    User selectAllInfoByStudyId(Integer studyId);

    List<User> selectByKeyInfo(String info);



}