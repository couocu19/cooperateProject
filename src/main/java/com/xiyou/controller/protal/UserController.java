package com.xiyou.controller.protal;


import com.xiyou.common.Const;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import com.xiyou.util.DateTimeUtil;
import com.xiyou.vo.MessageVo;
import com.xiyou.vo.UserMainPageVo;
import com.xiyou.vo.UserVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/user/")
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserController {


    @Autowired
    private IUserService iUserService;

    @ResponseBody
    @RequestMapping("register.do")
    @CrossOrigin
    public ServletResponse<User> register(String studentId, HttpServletRequest request){
        //为了设置默认头像的绝对路径
        String strPrefix = "http://118.31.12.175:8080"+request.getContextPath()+"/";

//        response.setHeader("Access-Control-Allow-Credentials", "true");

        return iUserService.register(studentId,strPrefix);

    }

    @ResponseBody
    @RequestMapping("login.do")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public ServletResponse<User> login(String studentId, HttpSession session, HttpServletResponse response){

        ServletResponse<User> selectResult = iUserService.login(studentId);
        if(selectResult.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,selectResult.getData());
        }
        // 允许跨域请求中携带cookie
        response.setHeader("Access-Control-Allow-Credentials", "true");
        return selectResult;
    }

    //修改用户信息:只能修改昵称,头像或者个性签名
    @ResponseBody
    @RequestMapping("update.do")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public ServletResponse<User> updateInformation(HttpSession session,User user){
        User currentUSer = (User) session.getAttribute(Const.CURRENT_USER);

        if(currentUSer == null){
            return ServletResponse.createByErrorMessage("当前未登录,请先登录~");
        }
        //todo:换另一种写法
        currentUSer.setUsername(user.getUsername());
        currentUSer.setSignature(user.getSignature());
//        currentUSer.setHeadSculpture(user.getHeadSculpture());
        ServletResponse response =  iUserService.updateInformation(currentUSer);

        //如果更新信息成功同时也要更新session域中的信息
        if(response.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }

        return response;

    }


    @ResponseBody
    @RequestMapping("get_user_info.do")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public ServletResponse<User> getUserInformation(HttpSession session){
        User currentUSer = (User) session.getAttribute(Const.CURRENT_USER);
        if(currentUSer == null){
            return ServletResponse.createByErrorMessage("当前未登录,请先登录~");
        }
        return ServletResponse.createBySuccess(currentUSer);

    }

    //只是获取当前用户的所有动态
    @ResponseBody
    @RequestMapping("get_currentUser_message.do")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public ServletResponse<List<Message>> getCurrentUserAllMessage(HttpSession session){
        User currentUSer = (User) session.getAttribute(Const.CURRENT_USER);
        if(currentUSer == null){
            return ServletResponse.createByErrorMessage("当前会话已超时~,请重新登录以查看~");
        }
        Integer id = currentUSer.getId();
        System.out.println(id);
        return iUserService.getUserALLMessage(id);
    }

    //获取某个用户的所有动态
    @ResponseBody
    @RequestMapping("get_user_message.do")
    @CrossOrigin(origins = "*",maxAge = 3600)
    public ServletResponse<List<Message>> getUserAllMessage(Integer id){


        return iUserService.getUserALLMessage(id);
    }

    //获取某个用户的信息以及所有动态
    @ResponseBody
    @RequestMapping("get_info_and_message.do")
    public ServletResponse<UserMainPageVo> getUserInfoAndMessages(Integer id){
        if(id == null){
            return ServletResponse.createByErrorMessage("无效参数");
        }
        ServletResponse response =  iUserService.getUserInfoAndMessages(id);

            if(response.isSuccess()){
                User user = (User)response.getData();
                UserMainPageVo userMainPageVo = assembleUserVo(user);
                return ServletResponse.createBySuccess(userMainPageVo);
            }

        return response;

    }

    //模糊查询
    @ResponseBody
    @RequestMapping("vagueSelect.do")
    public ServletResponse vagueSelectInfo(String info){
        return iUserService.vagueSelect(info);
    }


    private UserMainPageVo assembleUserVo(User user){
        UserMainPageVo userMainPageVo = new UserMainPageVo();
        userMainPageVo.setReadCount(user.getReadCount());
        List<MessageVo> list = new ArrayList<>();
        MessageVo messageVo = null;
        //填充主页下的动态信息
        if(user.getMessages()!=null) {
            for (Message m : user.getMessages()) {
                messageVo = new MessageVo();
                messageVo.setUserId(user.getId());
                messageVo.setUsername(user.getUsername());
                messageVo.setHeader(user.getHeadSculpture());
                messageVo.setTime(DateTimeUtil.dateToStr(m.getTime(), DateTimeUtil.STANDARD_FORMAT));
                messageVo.setCommentCount(m.getCommentCount());
                messageVo.setPraiseCount(m.getPraisePoints());
                messageVo.setMessageId(m.getId());
                if (m.getContent().getContentText() != null) {
                    messageVo.setContentText(m.getContent().getContentText());
                }
                if (m.getContent().getContentImages() != null) {
                    List<String> imagesVo = new ArrayList<>();
                    String[] images = m.getContent().getContentImages().split(",");
                    for (int i = 1; i < images.length; i++) {
                        imagesVo.add(images[i]);
                    }
                    messageVo.setContentImages(imagesVo);
                }
                if (m.getContent().getContentVideos() != null) {
                    String[] video = m.getContent().getContentVideos().split(",");
                    messageVo.setContentText(video[1]);
                }
                list.add(messageVo);
            }
        }
        //填充用户信息
        userMainPageVo.setStudentId(user.getStudentId());
        userMainPageVo.setMessageCount(user.getMessageCount());
        userMainPageVo.setUserId(user.getId());
        userMainPageVo.setMessageVos(list);
        userMainPageVo.setUsername(user.getUsername());
        userMainPageVo.setHeadSculpture(user.getHeadSculpture());
        userMainPageVo.setConcern(user.getConcern());
        userMainPageVo.setFans(user.getFans());
        userMainPageVo.setSignature(user.getSignature());

        return userMainPageVo;

    }

//    //查看某个用户的所有粉丝或者关注者
//    public ServletResponse<List<User>> getFansOrConcern(String studyId,)


}
