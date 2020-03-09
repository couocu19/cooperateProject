package com.xiyou.vo;

public class ReplyVo {
    private String replyUsername;;
    private String header;
    private String time;
    private String content;

    public ReplyVo(String replyUsername, String header, String time, String content) {
        this.replyUsername = replyUsername;
        this.header = header;
        this.time = time;
        this.content = content;
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
