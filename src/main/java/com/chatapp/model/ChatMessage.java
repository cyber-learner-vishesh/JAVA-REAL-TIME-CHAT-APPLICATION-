package com.chatapp.model;

public class ChatMessage {

    private String sender;
    private String content;
    private String type; // JOIN, LEAVE, MESSAGE

    public ChatMessage() {}

    // Getter & Setter for sender
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    // Getter & Setter for content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // ✅ IMPORTANT: Getter & Setter for type
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}