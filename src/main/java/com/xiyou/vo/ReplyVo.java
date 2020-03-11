package com.xiyou.vo;

public class ReplyVo {

    //发送回复的人信息
    private Integer replyId;
    private Integer sendReplyUserId;
    private String replyUsername;;
    private String header;
    private String time;
    private String content;

    //收到回复的人信息
    private Integer receiveReplyUserId;
    private String receiveReplyUserName;


    public Integer getSendReplyUserId() {
        return sendReplyUserId;
    }

    public void setSendReplyUserId(Integer sendReplyUserId) {
        this.sendReplyUserId = sendReplyUserId;
    }

    public Integer getReceiveReplyUserId() {
        return receiveReplyUserId;
    }

    public void setReceiveReplyUserId(Integer receiveReplyUserId) {
        this.receiveReplyUserId = receiveReplyUserId;
    }

    public String getReceiveReplyUserName() {
        return receiveReplyUserName;
    }

    public void setReceiveReplyUserName(String receiveReplyUserName) {
        this.receiveReplyUserName = receiveReplyUserName;
    }

    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }


    public ReplyVo(Integer replyId, Integer sendReplyUserId, String replyUsername, String header, String time, String content, Integer receiveReplyUserId, String receiveReplyUserName) {
        this.replyId = replyId;
        this.sendReplyUserId = sendReplyUserId;
        this.replyUsername = replyUsername;
        this.header = header;
        this.time = time;
        this.content = content;
        this.receiveReplyUserId = receiveReplyUserId;
        this.receiveReplyUserName = receiveReplyUserName;
    }

    public ReplyVo(){

    }
    public String getReplyUsername() {
        return replyUsername;
    }

    public void setReplyUsername(String replyUsername) {
        this.replyUsername = replyUsername;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
