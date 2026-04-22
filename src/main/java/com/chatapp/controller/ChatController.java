package com.chatapp.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.chatapp.model.ChatMessage;
import com.chatapp.model.UserStats;

@Controller
public class ChatController {

    // Active users
    private static Set<String> users = ConcurrentHashMap.newKeySet();

    // Left users
    private static List<String> leftUsers = Collections.synchronizedList(new ArrayList<>());

    // Online users (for status)
    private static Set<String> onlineUsers = ConcurrentHashMap.newKeySet();

    // Message count per user
    private static Map<String, UserStats> stats = new ConcurrentHashMap<>();

    // Server start time
    private static long startTime = System.currentTimeMillis();


    // ==============================
    // HANDLE CHAT MESSAGES
    // ==============================
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {

    if (message.getType().equals("JOIN")) {
        users.add(message.getSender());
    }

    if (message.getType().equals("LEAVE")) {
        users.remove(message.getSender());
        leftUsers.add(message.getSender());
    }

    return message;
    }


    // ==============================
    // DASHBOARD DATA
    // ==============================
    @MessageMapping("/stats")
    @SendTo("/topic/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> data = new HashMap<>();

        // Total users
        data.put("userCount", users.size());

        // Active users
        data.put("users", users);

        // Online users (for green dot)
        data.put("onlineUsers", onlineUsers);

        // Left users
        data.put("leftUsers", leftUsers);

        // Message stats per user
        List<Map<String, Object>> userStats = new ArrayList<>();

        for (UserStats us : stats.values()) {
            Map<String, Object> m = new HashMap<>();
            m.put("name", us.getUsername());
            m.put("messages", us.getMessageCount());
            userStats.add(m);
        }

        data.put("stats", userStats);

        // Server uptime (seconds)
        long uptime = (System.currentTimeMillis() - startTime) / 1000;
        data.put("uptime", uptime);

        return data;
    }
}