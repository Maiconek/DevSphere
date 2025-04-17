import React, { useState, useEffect, useRef, useContext } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import * as StompJs from '@stomp/stompjs';
import { AuthContext } from '../context/AuthContext';


import '../chat.css';

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [connected, setConnected] = useState(false);
    const messageAreaRef = useRef(null);
    const stompClientRef = useRef(null);
    const { token, user } = useContext(AuthContext);

    useEffect(() => {
        if (!connected) {
            const stompClient = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                debug: (str) => console.log('[STOMP]', str),
                connectHeaders: {
                    Authorization: `Bearer ${token.access_token}`,
                },
                onConnect: () => {
                    console.log('Connected to WebSocket');
                    setConnected(true);
    
                    stompClient.subscribe('/topic/public', (response) => {
                        const messageData = JSON.parse(response.body);
                        console.log('Received message:', messageData);
                        setMessages(prevMessages => [...prevMessages, messageData]);

                    });
                },
                onStompError: (frame) => {
                    console.error('Broker error:', frame.headers['message']);
                    console.error('Details:', frame.body);
                },
            });
    
            stompClient.activate();
            stompClientRef.current = stompClient;
    
            return () => {
                stompClient.deactivate();
            };
        }
    }, []); 
    

    const fetchMsg = async () => {
        console.log("User", user)
        try {
            let response = await fetch("http://localhost:8080/msg", {
                method: 'GET',
                'headers': {
                    'Authorization': "Bearer " + token.access_token,
                },
            })
            let data = await response.json()
            setMessages(data)
            console.log(data)
        } catch(error) {
            console.error("Bład połączenia: " + error)
        }
    }
    
        

    useEffect(() => {
        fetchMsg()
    }, [])

    // useEffect(() => {
    //     if (!connected) {
    //         console.log('🔌 Próbuję się połączyć z WebSocket...');

    //         const socket = new SockJS(`http://localhost:8080/ws?token=${token.access_token}`, null, {
    //             transports: ['websocket']
    //         });
    //         const client = StompJs.Stomp.over(socket);
    
    //         client.debug = (msg) => console.log('[STOMP]', msg);
    
    //         client.connect({}, () => {
    //             console.log('✅ Połączono z WebSocket!');
    //             client.subscribe('/topic/public', onMessageReceived);
    //             // client.send("/app/chat.addUser", {}, JSON.stringify({
    //             //     sender: username,
    //             //     type: 'JOIN'
    //             // }));
    //             setConnected(true);
    //         }, (err) => {
    //             console.error('❌ WebSocket connection error:', err);
    //         });
    
    //         stompClientRef.current = client;
    //     }
    
    //     return () => {
    //         stompClientRef.current?.disconnect();
    //     };
    // }, [connected]);


    useEffect(() => {
        messageAreaRef.current?.scrollTo(0, messageAreaRef.current.scrollHeight);
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageInput.trim() && stompClientRef.current?.connected) {
            stompClientRef.current.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify({
                    sender: username,
                    content: messageInput.trim(),
                    type: 'CHAT'
                })
            });
            console.log("kliklem");
            setMessageInput('');
        }
    };

    return (
        <div id="chat-page">
        <div className="chat-container">
            <div className="chat-header">
                <h2>DevSphere Public Chat</h2>
            </div>
            {!connected && <div className="connecting">Connecting...</div>}

            <ul id="messageArea" ref={messageAreaRef}>
                {messages.map((msg, index) => (
                    <li key={index} className="chat-message">
                    {/* <li key={index} className={msg.type === 'CHAT' ? 'chat-message' : 'event-message'}> */}
                        {/* {msg.type === 'CHAT' && ( */}
                            <>
                                <img src={msg.userDto.imageUrl} className="chat-image"></img>
                                {msg.userDto.email === user.sub ? 
                                    <span style={{color : "#6db33f"}}>Me</span>
                                    :
                                    <span>{msg.userDto.firstName}</span>
                                }
                            </>
                        {/* )} */}
                        {/* <p>
                            {msg.type === 'JOIN' ? `${msg.sender} joined!` :
                             msg.type === 'LEAVE' ? `${msg.sender} left!` :
                             msg.content}
                        </p> */}
                        <p>{msg.content}</p>
                    </li>
                ))}
            </ul>

            <form id="messageForm" onSubmit={handleSendMessage}>
                <div className="form-group">
                    <div className="input-group clearfix">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type a message..."
                            autoComplete="off"
                            className="form-control"
                        />
                        <button type="submit" className="primary">Send</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Chat;
