import { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { AuthContext } from "../context/AuthContext";

const useWebSocket = () => {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws", null, { transports: ["xhr-streaming"], headers: "Bearer " + token.access_token });
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (msg) => console.log("[STOMP DEBUG]", msg), // Logowanie STOMP
            onConnect: () => {
                console.log("Connected to WebSocket ✅");
                stompClient.subscribe("/topic/messages", (message) => {
                    setMessages((prev) => [...prev, JSON.parse(message.body)]);
                });
            },
            onStompError: (frame) => {
                console.error("STOMP Error ❌", frame);
            },
            onWebSocketError: (event) => {
                console.error("WebSocket Error ❌", event);
            },
            onDisconnect: () => console.log("Disconnected 🚪"),
        });
        
        stompClient.activate();
        setClient(stompClient);
        
        return () => {
            if (stompClient) stompClient.deactivate();
        };
    }, []);

    const sendMessage = (receiverId, content) => {
        if (client && client.connected) {
            console.log(content)
            client.publish({
                destination: "/app/chat",
                body: JSON.stringify({ receiverId, content }),
            });
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
