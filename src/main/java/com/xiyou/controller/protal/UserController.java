package com.xiyou.controller.protal;


import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

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

    @ResponseBody
    @RequestMapping("login.do")
    public ServletResponse<User> login(String studentId,HttpSession session){
        ServletResponse<User> selectResult = iUserService.login(studentId);
        if(selectResult.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,selectResult.getData());
        }
        return selectResult;
    }

    //修改用户信息:只能修改昵称,头像或者个性签名
    @ResponseBody
    @RequestMapping("update.do")
    public ServletResponse<User> updateInformation(HttpSession session,User user){
        User currentUSer = (User) session.getAttribute(Const.CURRENT_USER);

        if(currentUSer == null){
            return ServletResponse.createByErrorMessage("当前未登录,请先登录~");
        }
        //todo:换另一种写法
        currentUSer.setUsername(user.getUsername());
        currentUSer.setSignature(user.getSignature());
        currentUSer.setHeadSculpture(user.getHeadSculpture());
        ServletResponse response =  iUserService.updateInformation(currentUSer);

        //如果更新信息成功同时也要更新session域中的信息
        if(response.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }

        return response;

    }


    @ResponseBody
    @RequestMapping("get_user_info.do")
    public ServletResponse<User> getUserInformation(HttpSession session){
        User currentUSer = (User) session.getAttribute(Const.CURRENT_USER);
        if(currentUSer == null){
            return ServletResponse.createByErrorMessage("当前未登录,请先登录~");
        }
        return ServletResponse.createBySuccess(currentUSer);

    }

    public ServletResponse<List<Message>> getUserAllMessage(HttpSession session){
        User currentUSer = (User) session.getAttribute(Const.CURRENT_USER);
        if(currentUSer == null){
            return ServletResponse.createByErrorMessage("当前会话已超时~,请重新登录以查看~");
        }



    }






}
