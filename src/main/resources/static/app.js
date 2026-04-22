let stompClient = null;
let chart;

// ================== CONNECT ==================
function connect() {
    let socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log("Connected");

        // Receive messages
        stompClient.subscribe('/topic/messages', function (msg) {
            showMessage(JSON.parse(msg.body));
        });

        // Receive dashboard stats
        stompClient.subscribe('/topic/stats', function (data) {
            updateDashboard(JSON.parse(data.body));
        });

        // Send JOIN event
        let name = document.getElementById("name").value;
        if (name) {
            stompClient.send("/app/send", {}, JSON.stringify({
                sender: name,
                type: "JOIN"
            }));
        }

        // Request stats every 2 seconds
        setInterval(() => {
            stompClient.send("/app/stats", {});
        }, 2000);
    });
}

// ================== SEND MESSAGE ==================
function sendMessage() {
    let sender = document.getElementById("name").value;
    let content = document.getElementById("message").value;

    if (!sender || !content) return;

    stompClient.send("/app/send", {}, JSON.stringify({
        sender: sender,
        content: content,
        type: "MESSAGE"
    }));

    document.getElementById("message").value = "";
}

// ================== SHOW MESSAGE ==================
function showMessage(msg) {
    let chatBox = document.getElementById("chat-box");
    let div = document.createElement("div");

    if (msg.type === "JOIN") {
        div.textContent = msg.sender + " joined the chat";
        div.style.color = "lightgreen";
    }
    else if (msg.type === "LEAVE") {
        div.textContent = msg.sender + " left the chat";
        div.style.color = "red";
    }
    else {
        div.textContent = msg.sender + ": " + msg.content;
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================== DASHBOARD UPDATE ==================
function updateDashboard(data) {

    // Total users
    document.getElementById("userCount").textContent = data.userCount;

    // Uptime
    document.getElementById("uptime").textContent = data.uptime;

    // Active users (with green dot)
    let userList = document.getElementById("userList");
    userList.innerHTML = "";

    data.onlineUsers.forEach(u => {
        let li = document.createElement("li");

        let dot = document.createElement("span");
        dot.style.color = "lime";
        dot.textContent = "● ";

        li.appendChild(dot);
        li.appendChild(document.createTextNode(u));

        userList.appendChild(li);
    });

    // Message stats
    let stats = document.getElementById("messageStats");
    stats.innerHTML = "";

    let names = [];
    let counts = [];

    data.stats.forEach(s => {
        let li = document.createElement("li");
        li.textContent = s.name + " → " + s.messages + " messages";
        stats.appendChild(li);

        names.push(s.name);
        counts.push(s.messages);
    });

    // Left users
    let left = document.getElementById("leftUsers");
    left.innerHTML = "";

    data.leftUsers.forEach(u => {
        let li = document.createElement("li");
        li.textContent = u;
        left.appendChild(li);
    });

    // Update chart
    if (chart) {
        chart.data.labels = names;
        chart.data.datasets[0].data = counts;
        chart.update();
    }
}

// ================== CHART ==================
function initChart() {
    let ctx = document.getElementById('chart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Messages per User',
                data: []
            }]
        }
    });
}

// ================== LEAVE EVENT ==================
window.addEventListener("beforeunload", function () {
    let name = document.getElementById("name").value;

    if (stompClient && name) {
        stompClient.send("/app/send", {}, JSON.stringify({
            sender: name,
            type: "LEAVE"
        }));
    }
});

// ================== INIT ==================
initChart();
connect();