package com.xiyou.controller.protal;

import com.google.common.collect.Maps;
import com.xiyou.common.Const;
import com.xiyou.common.ResponseCode;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Content;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.IFileService;
import com.xiyou.service.IMessageService;
import com.xiyou.service.IUserService;
import com.xiyou.util.DateTimeUtil;
import com.xiyou.util.PropertiesUtil;
import com.xiyou.util.QiniuUploadImageUtil;
import com.xiyou.vo.MessageVo;
import com.xiyou.vo.ReplyVo;
import org.omg.PortableServer.SERVANT_RETENTION_POLICY_ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
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
    @Autowired
    private UserMapper userMapper;

    //用户发表动态
    //用MultipartFile[]来表示动态中的图片或者视频
    @ResponseBody
    @RequestMapping("add.do")
    public ServletResponse addMessage(HttpSession session,HttpServletRequest request,String contentText,@RequestParam(value = "upload_file",required = false)MultipartFile[] files){
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByError();
        }
        //获取Message中的参数 userId,剩下的值先都采取默认值,时间默认为当前时间
        Message message = new Message();
        Integer userId = user.getId();
        message.setUserId(userId);

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
                try {
                    String path = session.getServletContext().getRealPath("/")+fileName;
                    System.out.println(path);
                    f.transferTo(new File(path));
                    String url = QiniuUploadImageUtil.fileUpload(path);
                    newFileNames = newFileNames + "," +url;
                    File f1 = new File(path);
                    f1.delete();
                    //判断上传的文件是图片还是视频
                    if (dirName.equals("uploadImage")) {
                        content.setContentImages(newFileNames);
                    } else {
                        content.setContentVideos(newFileNames);
                    }
                }catch (Exception e){
                    return ServletResponse.createByErrorMessage("操作异常~");
                }
            }

        }
        ServletResponse<Message> response = iMessageService.addMessage(message,content);
        Message message1 = response.getData();
        MessageVo messageVo = null;
        if(response.isSuccess()){
           messageVo = assembleMessage(userId,message1,user);
            return ServletResponse.createBySuccess(messageVo);
        }

         return response;
    }


    //用户删除动态
    @ResponseBody
    @RequestMapping("delete.do")
    public ServletResponse<String> deleteMessage(HttpSession session,Integer messageId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        Integer userId = user.getId();
        if(user == null){
            return ServletResponse.createByError();
            //return ServletResponse.createByErrorMessage("当前会话已超时~请登录后再操作!");
        }
        return iMessageService.deleteMessage(messageId,userId);
    }


    //todo:完善点赞功能
    @ResponseBody
    @RequestMapping("praise.do")
    public ServletResponse praiseMessage(HttpSession session,Integer messageId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByError();
        }
        Integer id = user.getId();
        return iMessageService.praiseMessage(messageId,id);
    }

    @ResponseBody
    @RequestMapping("cancel_praise.do")
    public ServletResponse cancelPraise(HttpSession session,Integer id){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByError();
        }
        Integer userId = user.getId();
        return iMessageService.cancelPraise(id,userId);
    }

    @ResponseBody
    @RequestMapping("getPraiseUsers.do")
    public ServletResponse getPraiseUsers(HttpSession session,Integer messageId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByError();
           // return ServletResponse.createByErrorMessage("登录账户,解锁更多信息~");
        }

        return iMessageService.getPraiseUsers(messageId);

    }


    @ResponseBody
    @RequestMapping("getMessageById.do")
    public ServletResponse getMessage(HttpSession session,Integer messageId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByError();
            //return ServletResponse.createByErrorMessage("用户未登录!");
        }
        ServletResponse response = iMessageService.getMessageById(messageId);

        MessageVo messageVo = null;
        Message message = null;
        if(response.isSuccess()){
            message = (Message) response.getData();
            User user1 = userMapper.selectByPrimaryKey(message.getUserId());
            messageVo = assembleMessage(user.getId(),message,user1);
            return ServletResponse.createBySuccess(messageVo);
        }
        return ServletResponse.createByErrorMessage("error");

    }


    @ResponseBody
    @RequestMapping("getAll.do")
    public ServletResponse getAllUserMessages(HttpSession session){

        return iMessageService.getAll(session);

    }



    @ResponseBody
    @RequestMapping("getConcernAll.do")
    public ServletResponse getConcernAll(HttpSession session){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServletResponse.createByError();
        }
        ServletResponse response = iMessageService.getConcernAll(user);
        if(!response.isSuccess()){
            return response;
        }
        List<Message> messages = (List<Message>) response.getData();
        List<MessageVo> messageVos = new ArrayList<>();
        MessageVo messageVo = null;
        User user1 = null;
        for(Message message:messages){
            user1 = userMapper.selectByPrimaryKey(message.getUserId());
            messageVo = assembleMessage(user.getId(),message,user1);
            messageVos.add(messageVo);
        }
        Collections.sort(messageVos);
        if(messageVos.size()>15){
            List<MessageVo> list = messageVos.subList(0,15);
            return ServletResponse.createBySuccess(list);
        }


        return ServletResponse.createBySuccess(messageVos);


    }



    public MessageVo assembleMessage(@RequestParam(required = false) Integer id,Message message,User user){
        MessageVo messageVo = new MessageVo();
        String username = user.getUsername();
        messageVo.setMessageId(message.getId());
        messageVo.setUserId(user.getId());
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
                list.add(images[i]);
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

        //填充当前的点赞信息
        Boolean isPraise = iMessageService.isPraised(id,message.getId());
        if(isPraise == true){
            messageVo.setIsPraise(1);
        }else{
            messageVo.setIsPraise(0);

        }
        return messageVo;

    }





}






