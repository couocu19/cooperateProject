package com.xiyou.vo;

import com.xiyou.pojo.Praise;

public class PraiseVo {
    private Integer praiseId;
    private Integer praiseUserId;
    private String praiseUserName;
    private String header;
    private String signature;

    public Integer getPraiseId() {
        return praiseId;
    }

    public void setPraiseId(Integer praiseId) {
        this.praiseId = praiseId;
    }

    public Integer getPraiseUserId() {
        return praiseUserId;
    }

    public void setPraiseUserId(Integer praiseUserId) {
        this.praiseUserId = praiseUserId;
    }

    public String getPraiseUserName() {
        return praiseUserName;
    }

    public void setPraiseUserName(String praiseUserName) {
        this.praiseUserName = praiseUserName;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public PraiseVo(Integer praiseId, Integer praiseUserId, String praiseUserName, String header, String signature) {
        this.praiseId = praiseId;
        this.praiseUserId = praiseUserId;
        this.praiseUserName = praiseUserName;
        this.header = header;
        this.signature = signature;
    }

    public PraiseVo(){
        super();
    }
}
