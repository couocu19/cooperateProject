package com.xiyou.pojo;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class Message {
    private Integer id;

    private Integer userId;

    private Integer pageviews;

    private Integer praisePoints;

    private Integer commentCount;

    private Date time;

    private Boolean isDeleted;

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
        super();
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

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}