package com.xiyou.vo;

public class UserVo {
    private Integer id;
    private String userName;
    private String signature;
    private String header;
    private Integer fans;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public Integer getFans() {
        return fans;
    }

    public void setFans(Integer fans) {
        this.fans = fans;
    }

    public UserVo(Integer id, String userName, String signature, String header, Integer fans) {
        this.id = id;
        this.userName = userName;
        this.signature = signature;
        this.header = header;
        this.fans = fans;
    }

    public UserVo(){
        super();
    }
}
