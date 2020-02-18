package com.xiyou.service;

import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.User;

public interface IUserService {

    ServletResponse<User> register(String studentId,String preStr);

}
