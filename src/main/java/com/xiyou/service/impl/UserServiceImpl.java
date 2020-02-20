package com.xiyou.service.impl;

import com.xiyou.common.ServletResponse;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;


    public ServletResponse<User> register(String studentId,String preStr){
        if(StringUtils.isBlank(studentId)){
            return ServletResponse.createByErrorMessage("无效参数!");
        }

        int rowCount = userMapper.selectByStudentId(studentId);
        if(rowCount>0){
            return ServletResponse.createByErrorMessage("该学号已存在!");
        }
        User user = new User();
        user.setStudentId(studentId);
        user.setUsername(studentId);

        //设置用户的默认头像路径
        String path = preStr+"images/defaultHeader.jpg";
        user.setHeadSculpture(path);

        rowCount = userMapper.insertSelective(user);
        if(rowCount>0){
            return ServletResponse.createBySuccess("注册成功~",user);
        }

        return ServletResponse.createByErrorMessage("注册失败");

    }


    public ServletResponse<String> login(String studentId){
        if(StringUtils.isBlank(studentId)){
            return ServletResponse.createByErrorMessage("无效参数!");
        }

        int rowCount = userMapper.selectByStudentId(studentId);
        if(rowCount>0){
            return ServletResponse.createBySuccess("登陆成功~");
        }

        return ServletResponse.createByErrorMessage("该学号不存在~ 登录失败");

    }



}
