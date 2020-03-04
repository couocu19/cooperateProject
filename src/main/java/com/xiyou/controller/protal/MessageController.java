package com.xiyou.controller.protal;

import com.google.common.collect.Maps;
import com.xiyou.common.Const;
import com.xiyou.common.ResponseCode;
import com.xiyou.common.ServletResponse;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.IFileService;
import com.xiyou.service.IMessageService;
import com.xiyou.service.IUserService;
import com.xiyou.util.DateTimeUtil;
import com.xiyou.util.PropertiesUtil;
import com.xiyou.vo.MessageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/message/")
@CrossOrigin(origins = "*",maxAge = 3600)
public class MessageController {

    @Autowired
    private IFileService iFileService;
    @Autowired
    private IUserService iUserService;
    @Autowired
    private IMessageService iMessageService;

//    @RequestMapping("upload.do")
//    @ResponseBody
//    //required:是否为必须？
//    public ServletResponse upload(@RequestParam(value = "upload_file",required = false) MultipartFile file, HttpServletRequest request, HttpSession session) {
//
//        User user = (User) session.getAttribute(Const.CURRENT_USER);
//        if (user == null) {
//            return ServletResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(), "用户未登录,请先登录.");
//        }
//        //业务层
//        String path = request.getSession().getServletContext().getRealPath("dirName");
//        String targetFileName = iFileService.upload(file, path);
//        String url = PropertiesUtil.getProperty("ftp.server.http.prefix") + targetFileName;
//
//        Map fileMap = Maps.newHashMap();
//        fileMap.put("uri", targetFileName);
//        fileMap.put("url", url);
//        System.out.println(url);
//        return ServletResponse.createBySuccess(fileMap);
//    }


    //用户发表动态
    //用MultipartFile[]来表示动态中的图片或者视频
    @ResponseBody
    @RequestMapping("add.do")
    public ServletResponse addMessage(HttpSession session,HttpServletRequest request,String contentText,@RequestParam(value = "upload_file",required = false)MultipartFile[] files){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户未登录,清先登录~");
        }
        //获取Message中的参数 userId,剩下的值先都采取默认值,时间默认为当前时间
        Message message = new Message();
//        Date date = new Date();
        Integer userId = user.getId();
        message.setUserId(userId);
//        message.setTime(date);

        //获取content中的参数,即动态中的内容
        Content content = new Content();
        String newFileNames = "";
        String dirName = null;
        content.setContentText(contentText);
        String fileName;

        if(files == null || files.length == 0){
            content.setContentImages(null);
            content.setContentVideos(null);
        }else {

            for (MultipartFile f : files) {
                fileName = f.getOriginalFilename();
                //截取文件扩展名
                String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                if (!Const.contentMap().containsKey(fileExt)) {
                    return ServletResponse.createByErrorMessage("不合规的文件格式~请重新选择！");
                }
                dirName = Const.contentMap().get(fileExt);
                newFileNames = newFileNames + "," + getFilePath(f, request, session, dirName);
            }
            //判断上传的文件是图片还是视频
            if (dirName.equals("uploadImage")) {
                content.setContentImages(newFileNames);
            } else {
                content.setContentVideos(newFileNames);
            }
        }

       // iMessageService.addMessage(message,content);
        ServletResponse<Message> response = iMessageService.addMessage(message,content);

        Message message1 = response.getData();
        MessageVo messageVo = null;
        if(response.isSuccess()){
           messageVo = assembleMessage(message1,user);
            return ServletResponse.createBySuccess(messageVo);
        }

       // return ServletResponse.createBySuccess(messageVo);

         return response;
    }

    private MessageVo assembleMessage(Message message,User user){
        MessageVo messageVo = new MessageVo();
        String username = user.getUsername();
        messageVo.setUsername(username);
        messageVo.setHeader(user.getHeadSculpture());
        messageVo.setTime(DateTimeUtil.dateToStr(message.getTime(),"yyyy-MM-dd HH:mm:ss"));
        if(message.getContent().getContentText()!=null){
            messageVo.setContentText(message.getContent().getContentText());
        }

        if(message.getContent().getContentImages()!=null){
            String[] images = message.getContent().getContentImages().split(",");
            List<String> list = new ArrayList<>();
            for(int i = 1;i<images.length;i++){
                list.add(Const.urlPrefix+"uploadImage/"+images[i]);
            }
            messageVo.setContentImages(list);
        }

        if(message.getContent().getContentVideos()!=null){
            String[] video = message.getContent().getContentVideos().split(",");
            messageVo.setContentVideos(Const.urlPrefix+"uploadVideo/"+video[1]);
        }

        if(message.getPraisePoints() == null) {
            messageVo.setPraiseCount(0);
        }else{
            messageVo.setPraiseCount(message.getPraisePoints());
        }

        if(message.getPraisePoints() == null) {
            messageVo.setCommentCount(0);
        }else{
            messageVo.setCommentCount(message.getCommentCount());
        }

        return messageVo;

    }

    private String getFilePath(@RequestParam(value = "upload_file",required = false) MultipartFile file, HttpServletRequest request, HttpSession session,String dirName){

        String path = request.getSession().getServletContext().getRealPath(dirName);
        String targetFileName = iFileService.upload(file, path);
        return targetFileName;
    }

    //todo:待测试
    //用户删除动态
    @ResponseBody
    @RequestMapping("delete.do")
    public ServletResponse<String> deleteMessage(HttpSession session,Integer messageId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("当前会话已超时~请登录后再操作!");
        }
        return iMessageService.deleteMessage(messageId);
    }


    //todo:待测试
    @ResponseBody
    @RequestMapping("praise.do")
    public ServletResponse praiseMessage(HttpSession session,Integer messageId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户未登录!");
        }
        Integer id = user.getId();
        return iMessageService.praiseMessage(messageId,id);
    }

    //todo:待测试
    @ResponseBody
    @RequestMapping("cancel_praise.do")
    public ServletResponse cancelPraise(HttpSession session,Integer praiseId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户未登录!");
        }
        Integer id = user.getId();
        return iMessageService.cancelPraise(praiseId,id);
    }




}






