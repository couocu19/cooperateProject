package com.xiyou.vo;


import java.util.List;

//模糊查询的包含的信息
public class MessageAndUserVo {
    private List<MessageVo> messageVos;
    private List<UserVo> userVos;

    public MessageAndUserVo(List<MessageVo> messageVos, List<UserVo> userVos) {
        this.messageVos = messageVos;
        this.userVos = userVos;
    }

    public MessageAndUserVo(){
        super();
    }

    public List<MessageVo> getMessageVos() {
        return messageVos;
    }

    public void setMessageVos(List<MessageVo> messageVos) {
        this.messageVos = messageVos;
    }

    public List<UserVo> getUserVos() {
        return userVos;
    }

    public void setUserVos(List<UserVo> userVos) {
        this.userVos = userVos;
    }


}
