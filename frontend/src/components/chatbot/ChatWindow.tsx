// src/components/ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';

interface MessageType {
  role: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: MessageType[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.map((msg, index) => (
        <Message
          key={index}
          role={msg.role}
          content={msg.content}
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;