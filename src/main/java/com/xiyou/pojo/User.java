package com.xiyou.pojo;

import org.springframework.stereotype.Component;


public class User {
    private Integer id;

    private String username;

    private String headSculpture;

    private String signature;

    private Integer messageCount;

    private Integer fans;

    private Integer concern;

    private Integer readCount;

    private String studentId;

    public User(Integer id, String username, String headSculpture, String signature, Integer messageCount, Integer fans, Integer concern, Integer readCount, String studentId) {
        this.id = id;
        this.username = username;
        this.headSculpture = headSculpture;
        this.signature = signature;
        this.messageCount = messageCount;
        this.fans = fans;
        this.concern = concern;
        this.readCount = readCount;
        this.studentId = studentId;
    }

    public User() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getHeadSculpture() {
        return headSculpture;
    }

    public void setHeadSculpture(String headSculpture) {
        this.headSculpture = headSculpture == null ? null : headSculpture.trim();
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature == null ? null : signature.trim();
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

    public Integer getReadCount() {
        return readCount;
    }

    public void setReadCount(Integer readCount) {
        this.readCount = readCount;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId == null ? null : studentId.trim();
    }
}