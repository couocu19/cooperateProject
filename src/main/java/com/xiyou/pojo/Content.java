package com.xiyou.pojo;

public class Content {
    private Integer id;

    private Integer messageId;

    private String contentText;

    private String contentImages;

    private String contentVideos;

    public Content(Integer id, Integer messageId, String contentText, String contentImages, String contentVideos) {
        this.id = id;
        this.messageId = messageId;
        this.contentText = contentText;
        this.contentImages = contentImages;
        this.contentVideos = contentVideos;
    }

    public Content() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText == null ? null : contentText.trim();
    }

    public String getContentImages() {
        return contentImages;
    }

    public void setContentImages(String contentImages) {
        this.contentImages = contentImages == null ? null : contentImages.trim();
    }

    public String getContentVideos() {
        return contentVideos;
    }

    public void setContentVideos(String contentVideos) {
        this.contentVideos = contentVideos == null ? null : contentVideos.trim();
    }
}