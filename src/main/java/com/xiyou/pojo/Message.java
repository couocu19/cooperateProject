package com.xiyou.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.util.Date;


public class Message {
    private Integer id;

    private Integer userId;

    private Integer pageviews;

    private Integer praisePoints;

    private Integer commentCount;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    private Boolean isDeleted;

    public Message(Integer id, Integer userId, Integer pageviews, Integer praisePoints, Integer commentCount, Date time) {
        this.id = id;
        this.userId = userId;
        this.pageviews = pageviews;
        this.praisePoints = praisePoints;
        this.commentCount = commentCount;
        this.time = time;
    }


    //导入一对一的对象类型
    private Content content;

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public Message(Integer id, Integer userId, Integer pageviews, Integer praisePoints, Integer commentCount, Date time, Boolean isDeleted) {
        this.id = id;
        this.userId = userId;
        this.pageviews = pageviews;
        this.praisePoints = praisePoints;
        this.commentCount = commentCount;
        this.time = time;
        this.isDeleted = isDeleted;
    }

    public Message() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPageviews() {
        return pageviews;
    }

    public void setPageviews(Integer pageviews) {
        this.pageviews = pageviews;
    }

    public Integer getPraisePoints() {
        return praisePoints;
    }

    public void setPraisePoints(Integer praisePoints) {
        this.praisePoints = praisePoints;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }




}