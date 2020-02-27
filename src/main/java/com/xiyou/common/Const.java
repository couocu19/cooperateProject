package com.xiyou.common;

import com.xiyou.util.PropertiesUtil;

import java.util.HashMap;
import java.util.Map;

public class Const {

    public static final String CURRENT_USER = "currentUser";
    public static final String USERNAME = "username";
    public static final String EMAIL = "email";
    public static Map<String,String> contentMap(){
        HashMap<String,String> contentMap = new HashMap<>();
        //符合格式条件的图片格式
        contentMap.put("jpg","uploadImage");
        contentMap.put("png","uploadImage");
        contentMap.put("gif","uploadImage");
        contentMap.put("jpeg","uploadImage");
        contentMap.put("bmp","uploadImage");
        //符合格式条件的视频格式
        contentMap.put("mp3","uploadVideo");
        contentMap.put("mp4","uploadVideo");
        contentMap.put("swf","uploadVideo");
        contentMap.put("flv","uploadVideo");
        contentMap.put("wav","uploadVideo");
        contentMap.put("wma","uploadVideo");
        contentMap.put("wmv","uploadVideo");
        contentMap.put("mid","uploadVideo");
        contentMap.put("avi","uploadVideo");
        contentMap.put("mpg","uploadVideo");
        contentMap.put("asf","uploadVideo");
        contentMap.put("rm","uploadVideo");
        contentMap.put("rmvb","uploadVideo");
        return contentMap;
    }
    //显示图片/视频文件的前缀
    public static final String urlPrefix = PropertiesUtil.getProperty("ftp.server.http.prefix");

}
