package com.xiyou.vo;

public class CommentVo {

    private Integer commentId;
    private String sendUsername;
    private String header;
    private String time;
    private String content;
    private Integer praiseCount;

    //评论下面的第一个回复
    private String firstReplyUser;
    private String firstReplyContent;
    //说明该条评论一共有几条回复
    private String replyCountMessage;

    public CommentVo(){
        super();
    }


    public Integer getPraiseCount() {
        return praiseCount;
    }

    public void setPraiseCount(Integer praiseCount) {
        this.praiseCount = praiseCount;
    }

    public String getSendUsername() {
        return sendUsername;
    }

    public void setSendUsername(String sendUsername) {
        this.sendUsername = sendUsername;
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

    public String getFirstReplyUser() {
        return firstReplyUser;
    }

    public void setFirstReplyUser(String firstReplyUser) {
        this.firstReplyUser = firstReplyUser;
    }

    public String getFirstReplyContent() {
        return firstReplyContent;
    }

    public void setFirstReplyContent(String firstReplyContent) {
        this.firstReplyContent = firstReplyContent;
    }

    public String getReplyCountMessage() {
        return replyCountMessage;
    }

    public void setReplyCountMessage(String replyCountMessage) {
        this.replyCountMessage = replyCountMessage;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public CommentVo(Integer commentId, String sendUsername, String header, String time, String content, Integer praiseCount, String firstReplyUser, String firstReplyContent, String replyCountMessage) {
        this.commentId = commentId;
        this.sendUsername = sendUsername;
        this.header = header;
        this.time = time;
        this.content = content;
        this.praiseCount = praiseCount;
        this.firstReplyUser = firstReplyUser;
        this.firstReplyContent = firstReplyContent;
        this.replyCountMessage = replyCountMessage;
    }
}
