package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.vo.UserVo;

import java.util.List;

public interface IUserService {

    ServletResponse<User> register(String studentId,String preStr);

    ServletResponse<User> login(String studentId);

    ServletResponse<User> updateInformation(User user);

    ServletResponse<List<Message>> getUserALLMessage(Integer id);

    ServletResponse<User> getUserInfoAndMessages(Integer studentId);

    ServletResponse vagueSelect(String massage);

    ServletResponse concernUser(User user,Integer concernedUserId);

    ServletResponse<List<UserVo>> getConcernsById(Integer id);


    ServletResponse<List<UserVo>> getFansById(Integer id);

}
