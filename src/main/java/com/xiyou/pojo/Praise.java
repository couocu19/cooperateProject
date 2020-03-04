package com.xiyou.pojo;

public class Praise {

    private Integer id;
    private Integer userId;
    private Integer messageId;
    private boolean isCanceled;
    public Praise(Integer id, Integer userId, Integer messageId, boolean isCanceled) {
        this.id = id;
        this.userId = userId;
        this.messageId = messageId;
        this.isCanceled = isCanceled;
    }

    public Praise(){
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

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
    }
}
