package com.xiyou.vo;


import java.util.List;

public class UserMainPageVo {

    private String username;

    private String headSculpture;

    private String signature;

    private Integer messageCount;

    private Integer fans;

    private Integer concern;

//    private Integer readCount;

    private String studentId;

    private List<MessageVo> messageVos;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHeadSculpture() {
        return headSculpture;
    }

    public void setHeadSculpture(String headSculpture) {
        this.headSculpture = headSculpture;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Integer getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(Integer messageCount) {
        this.messageCount = messageCount;
    }

    public Integer getFans() {
        return fans;
    }

    public void setFans(Integer fans) {
        this.fans = fans;
    }

    public Integer getConcern() {
        return concern;
    }

    public void setConcern(Integer concern) {
        this.concern = concern;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public List<MessageVo> getMessageVos() {
        return messageVos;
    }

    public void setMessageVos(List<MessageVo> messageVos) {
        this.messageVos = messageVos;
    }

    public UserMainPageVo(String username, String headSculpture, String signature, Integer messageCount, Integer fans, Integer concern, String studentId, List<MessageVo> messageVos) {
        this.username = username;
        this.headSculpture = headSculpture;
        this.signature = signature;
        this.messageCount = messageCount;
        this.fans = fans;
        this.concern = concern;
        this.studentId = studentId;
        this.messageVos = messageVos;
    }

    public UserMainPageVo(){
        super();
    }
}
