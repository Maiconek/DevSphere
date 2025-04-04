import { useState } from "react";
import useWebSocket from "../websocket/useWebSocket";

const Chat = () => {
    const { messages, sendMessage } = useWebSocket();
    const [message, setMessage] = useState("");
    const receiverId = 2; // Przykładowy odbiorca

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.sender.firstName}:</strong> {msg.content}</p>
                        <small>{new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => sendMessage(receiverId, message)}>Wyślij</button>
        </div>
    );
};

export default Chat;
