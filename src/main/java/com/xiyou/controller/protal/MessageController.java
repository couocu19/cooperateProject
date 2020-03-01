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
import com.xiyou.util.PropertiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Date;
import java.util.Map;

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
    public ServletResponse<Message> addMessage(HttpSession session,HttpServletRequest request,String contentText,@RequestParam(value = "upload_file",required = false)MultipartFile[] files){
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

        return iMessageService.addMessage(message,content);

    }

    private String getFilePath(@RequestParam(value = "upload_file",required = false) MultipartFile file, HttpServletRequest request, HttpSession session,String dirName){

        String path = request.getSession().getServletContext().getRealPath(dirName);
        String targetFileName = iFileService.upload(file, path);
        return targetFileName;
    }



    }

