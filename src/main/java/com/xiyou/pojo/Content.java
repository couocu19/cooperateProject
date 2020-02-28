package com.xiyou.pojo;

import org.springframework.stereotype.Component;


public class Content {
    private Integer id;

    private Integer messageId;

    private String contentText;

    private String contentImages;

    private String contentVideos;


    public Content(Integer id, String contentText, String contentImages, String contentVideos) {
        this.id = id;
        this.contentText = contentText;
        this.contentImages = contentImages;
        this.contentVideos = contentVideos;
    }

    public Content(Integer id, Integer messageId, String contentText, String contentImages, String contentVideos) {
        this.id = id;
        this.messageId = messageId;
        this.contentText = contentText;
        this.contentImages = contentImages;
        this.contentVideos = contentVideos;
    }

    @Override
    public String toString() {
        return "Content{" +
                "id=" + id +
                ", messageId=" + messageId +
                ", contentText='" + contentText + '\'' +
                ", contentImages='" + contentImages + '\'' +
                ", contentVideos='" + contentVideos + '\'' +
                '}';
    }

    public Content() {

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