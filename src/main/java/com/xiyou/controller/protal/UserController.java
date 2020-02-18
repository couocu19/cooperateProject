package com.xiyou.controller.protal;


import com.xiyou.common.ServletResponse;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/user/")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @ResponseBody
    @RequestMapping("register.do")
    public ServletResponse<User> register(String studentId, HttpServletRequest request){
        //为了设置默认头像的绝对路径
        String strPrefix = "http://localhost:8080"+request.getContextPath()+"/";
        return iUserService.register(studentId,strPrefix);

    }






}
