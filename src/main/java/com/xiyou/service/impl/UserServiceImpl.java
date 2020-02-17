package com.xiyou.service.impl;

import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;



}
