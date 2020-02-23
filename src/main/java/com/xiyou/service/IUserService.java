package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;

import java.util.List;

public interface IUserService {

    ServletResponse<User> register(String studentId,String preStr);

    ServletResponse<User> login(String studentId);

    ServletResponse<User> updateInformation(User user);

    ServletResponse<List<Message>> getUserALLMessage(Integer id);

   // ServletResponse<User> getUserInfoAndMessages(String studyId);

}
