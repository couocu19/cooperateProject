package com.xiyou.vo;

import com.xiyou.pojo.Message;

import java.util.List;

public class MessageAndCommentVo {

  private MessageVo messageVo;

  private List<CommentVo> comments;

  public MessageAndCommentVo(){
      super();
  }

    public MessageAndCommentVo(MessageVo messageVo, List<CommentVo> comments) {
        this.messageVo = messageVo;
        this.comments = comments;
    }

    public MessageVo getMessageVo() {
        return messageVo;
    }

    public void setMessageVo(MessageVo messageVo) {
        this.messageVo = messageVo;
    }

    public List<CommentVo> getComments() {
        return comments;
    }

    public void setComments(List<CommentVo> comments) {
        this.comments = comments;
    }
}
