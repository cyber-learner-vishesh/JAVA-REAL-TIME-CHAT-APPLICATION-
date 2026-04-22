package com.chatapp.model;

public class UserStats {
    private String username;
    private int messageCount;

    public UserStats(String username) {
        this.username = username;
        this.messageCount = 0;
    }

    public void incrementMessages() {
        this.messageCount++;
    }

    public String getUsername() {
        return username;
    }

    public int getMessageCount() {
        return messageCount;
    }
}