package com.xiyou.vo;

import com.xiyou.pojo.Message;

import java.util.Date;
import java.util.List;

public class MessageVo {

    //发表动态的用户的基本信息
    private String username;
    private String header;
    private String time;

    //动态内容
    private String contentText;
    private List<String> contentImages;
    private String contentVideos;

    //动态的点赞和评论数
    private Integer commentCount;
    private Integer praiseCount;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public void setPraiseCount(Integer praiseCount) {
        this.praiseCount = praiseCount;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public List<String> getContentImages() {
        return contentImages;
    }

    public void setContentImages(List<String> contentImages) {
        this.contentImages = contentImages;
    }

    public String getContentVideos() {
        return contentVideos;
    }

    public void setContentVideos(String contentVideos) {
        this.contentVideos = contentVideos;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public int getPraiseCount() {
        return praiseCount;
    }

    public void setPraiseCount(int praiseCount) {
        this.praiseCount = praiseCount;
    }

    public MessageVo(String username, String header, String time, String contentText, List<String> contentImages,String contentVideos, Integer commentCount, Integer praiseCount) {
        this.username = username;
        this.header = header;
        this.time = time;
        this.contentText = contentText;
        this.contentImages = contentImages;
        this.contentVideos = contentVideos;
        this.commentCount = commentCount;
        this.praiseCount = praiseCount;
    }

    public MessageVo(){
        super();
    }
}
