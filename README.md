The `README.md` file for the **Real-Time Chat Application** has been created based on the project documentation.

```python



A web-based communication system developed as part of the **Advanced Java Programming Lab (CIE-306P)** at **Maharaja Agrasen Institute of Technology (MAIT)**. This application enables multiple users to exchange messages instantly over a network using WebSocket technology for a persistent, bidirectional connection.

## 👤 Project Details
- **Student Name:** Vishesh KR Mahor
- **Roll No:** 01814802723
- **Group:** 6th – Cyber Security
- **Faculty Name:** Mr. Ajay Kalusnik
- **Department:** Computer Science and Engineering

---

## 🚀 Features
- **Real-Time Messaging:** Instant message delivery to all connected clients without page refreshes.
- **Active User Tracking:** A visual dashboard showing currently online users with green status indicators.
- **Join/Leave Notifications:** Automatic alerts when users enter or exit the chat room.
- **User Analytics:** Tracks the number of messages sent by each user.
- **Live Dashboard:** Real-time statistics including:
  - Total users connected.
  - List of active and left users.
  - Server uptime.
  - Message count per user.

---

## 🛠️ Technologies Used

### Backend
- **Java (Spring Boot Framework):** Simplifies development with built-in configurations and an embedded Tomcat server.
- **WebSocket Protocol (STOMP):** Enables persistent connections and structured message broadcasting.

### Frontend
- **HTML/CSS/JavaScript:** For a responsive, dark-themed user interface.
- **SockJS & STOMP.js:** Ensures WebSocket compatibility across different browsers.

---

## 📂 Project Structure
```text
├── src/main/java/com/chatapp/
│   ├── ChatAppApplication.java    # Main entry point (Spring Boot)
│   ├── config/
│   │   └── WebSocketConfig.java   # WebSocket & STOMP configurations
│   ├── controller/
│   │   └── ChatController.java    # Logic for message handling & stats
│   ├── model/
│   │   ├── ChatMessage.java       # Message data structure
│   │   └── UserStats.java         # User activity tracking model
├── src/main/resources/
│   ├── static/
│   │   ├── index.html             # User interface structure
│   │   ├── style.css              # Dark theme styling
│   │   └── app.js                 # Client-side WebSocket logic
│   └── application.properties     # Server settings (Port: 8080)
└── pom.xml                        # Maven dependencies
```

---

## 🔧 Installation and Setup

### Prerequisites
- **JDK 17** or above.
- An IDE (IntelliJ IDEA, VS Code, or Eclipse).
- **Maven** (optional, if not using IDE-integrated Maven).

### Steps to Run
1. **Open Project:** Load the `chat-app` folder in your IDE.
2. **Build:** Run `mvn clean install` to download dependencies.
3. **Execute:** Run the `ChatAppApplication.java` file.
4. **Access:** Open your browser and navigate to:
   ```text
   http://localhost:8080
   ```

---

## 📖 How to Use
1. **Enter Name:** Provide a username at the top of the interface and click **Join**.
2. **Chat:** Type messages in the input box; they are broadcast instantly to all users.
3. **Monitor:** View live stats, active users, and server uptime on the **Dashboard** panel.

---

## ⚠️ Limitations & Future Enhancements
### Current Limitations
- No user authentication or registration.
- No database integration (messages are not persistent).
- No private (one-to-one) messaging support.

### Planned Enhancements
- **Auth System:** Secure login/registration.
- **Database:** MySQL/MongoDB integration for chat history.
- **Media Support:** File and image sharing capabilities.
- **Security:** Message encryption and Secure WebSocket (WSS) implementation.
- **Mobile Integration:** Development of a Flutter or Android companion app.

---

## 📝 Conclusion
This project demonstrates the effective integration of Spring Boot and WebSockets to create a responsive, real-time communication tool, providing a foundation for more complex chat platforms.
"""

