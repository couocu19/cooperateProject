package com.xiyou.vo;

import java.util.List;

public class CommentAndReplyVo {

    private Integer commentId;
    private Integer sendUserId;
    private String sendUsername;
    private String header;
    private String time;
    private String content;
    private Integer praiseCount;

    //某一条评论的回复列表
    private List<ReplyVo> replies;

    public CommentAndReplyVo(){
        super();
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


    public CommentAndReplyVo(Integer commentId, Integer sendUserId, String sendUsername, String header, String time, String content, Integer praiseCount, List<ReplyVo> replies) {
        this.commentId = commentId;
        this.sendUserId = sendUserId;
        this.sendUsername = sendUsername;
        this.header = header;
        this.time = time;
        this.content = content;
        this.praiseCount = praiseCount;
        this.replies = replies;
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

    public Integer getPraiseCount() {
        return praiseCount;
    }

    public void setPraiseCount(Integer praiseCount) {
        this.praiseCount = praiseCount;
    }

    public List<ReplyVo> getReplies() {
        return replies;
    }

    public void setReplies(List<ReplyVo> replies) {
        this.replies = replies;
    }
}
