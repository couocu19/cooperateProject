package com.xiyou.service.impl;

import com.google.common.collect.Lists;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import com.xiyou.vo.UserVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MessageMapper messageMapper;

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


    public ServletResponse<User> login(String studentId){
        if(StringUtils.isBlank(studentId)){
            return ServletResponse.createByErrorMessage("无效参数!");
        }

        int rowCount = userMapper.selectByStudentId(studentId);
        if(rowCount>0){
            User user = userMapper.checkLogin(studentId);
            return ServletResponse.createBySuccess("登陆成功~",user);
        }
        return ServletResponse.createByErrorMessage("该学号不存在~ 登录失败");

    }

    public ServletResponse<User> updateInformation(User user){

       int rowCount =  userMapper.updateByPrimaryKeySelective(user);

       if(rowCount>0){
           return ServletResponse.createBySuccess("修改信息成功~!",user);
       }

       return ServletResponse.createByErrorMessage("修改信息失败~");

    }

    public ServletResponse<List<Message>> getUserALLMessage(Integer id){
        List<Message> list = messageMapper.getUserAllMessage(id);
        if(list.size() == 0){
            return ServletResponse.createBySuccessMessage("这里空空如也~");
        }

        //todo:处理动态中文字内容，图片内容，视频内容为空的状况

        return ServletResponse.createBySuccess(list);

    }

    public ServletResponse<User> getUserInfoAndMessages(String studentId){
        User users = userMapper.selectAllInfoByStudyId(studentId);
        User user = new User();
        user.setId(users.getId());
        Integer readCount = users.getReadCount();
        readCount++;
        //更新主页阅读总量
        user.setReadCount(readCount);
        userMapper.updateByPrimaryKeySelective(user);

        if(users==null){
            return ServletResponse.createByErrorMessage("该用户不存在!");
        }

        return ServletResponse.createBySuccess(users);
    }



    public ServletResponse<List<UserVo>> vagueSelect(String massage){
        String sqlMassage = "%"+massage+"%";
        List<User> users = userMapper.selectByKeyInfo(sqlMassage);
        if(users!=null){
            List<UserVo> userVos = new ArrayList<>();
            UserVo userVo = null;
            for(User user:users){
                userVo = assembleUser(user);
                userVos.add(userVo);
            }
            return ServletResponse.createBySuccess(userVos);
        }
        return ServletResponse.createByErrorMessage("没有查到相关用户~");
    }

    private UserVo assembleUser(User user){
        UserVo userVo = new UserVo();
        userVo.setId(user.getId());
        userVo.setHeader(user.getHeadSculpture());
        userVo.setUserName(user.getUsername());
        userVo.setFans(user.getFans());
        userVo.setSignature(user.getSignature());

        return userVo;
    }

}
