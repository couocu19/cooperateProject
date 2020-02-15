package com.xiyou.pojo;

import java.util.Date;

public class Reply {
    private Integer id;

    private Integer messageId;

    private Integer commentId;

    private Integer sendUserId;

    private String content;

    private Date time;

    private Boolean isDeleted;

    private Integer receiveUserId;

    public Reply(Integer id, Integer messageId, Integer commentId, Integer sendUserId, String content, Date time, Boolean isDeleted, Integer receiveUserId) {
        this.id = id;
        this.messageId = messageId;
        this.commentId = commentId;
        this.sendUserId = sendUserId;
        this.content = content;
        this.time = time;
        this.isDeleted = isDeleted;
        this.receiveUserId = receiveUserId;
    }

    public Reply() {
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

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public Integer getSendUserId() {
        return sendUserId;
    }

    public void setSendUserId(Integer sendUserId) {
        this.sendUserId = sendUserId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
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

    public Integer getReceiveUserId() {
        return receiveUserId;
    }

    public void setReceiveUserId(Integer receiveUserId) {
        this.receiveUserId = receiveUserId;
    }
}