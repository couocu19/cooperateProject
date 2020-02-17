package com.xiyou.pojo;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class Comment {
    private Integer id;

    private Integer messageId;

    private Integer userId;

    private String conent;

    private Integer replyCount;

    private Date time;

    private Integer praiseCount;

    private Boolean isDeleted;

    public Comment(Integer id, Integer messageId, Integer userId, String conent, Integer replyCount, Date time, Integer praiseCount, Boolean isDeleted) {
        this.id = id;
        this.messageId = messageId;
        this.userId = userId;
        this.conent = conent;
        this.replyCount = replyCount;
        this.time = time;
        this.praiseCount = praiseCount;
        this.isDeleted = isDeleted;
    }

    public Comment() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getConent() {
        return conent;
    }

    public void setConent(String conent) {
        this.conent = conent == null ? null : conent.trim();
    }

    public Integer getReplyCount() {
        return replyCount;
    }

    public void setReplyCount(Integer replyCount) {
        this.replyCount = replyCount;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getPraiseCount() {
        return praiseCount;
    }

    public void setPraiseCount(Integer praiseCount) {
        this.praiseCount = praiseCount;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}