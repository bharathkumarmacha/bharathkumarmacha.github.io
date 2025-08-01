// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import NewChatButton from './NewChatButton';
import InputArea from './InputArea';
import axios from 'axios';


const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your assistant. How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (content.trim() === '') return;

    const newMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setContent('');
    setIsLoading(true);

    try {
        const response = await axios.post(process.env.REACT_APP_LLM_API!, {
          model: process.env.REACT_APP_LLM_MODEL!,
          messages: [
            ...messages.filter((msg) => msg.role !== 'system'),
            newMessage,
          ],
          stream: false
        });

      const assistantMessage = {
        ...response.data.message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setContent('');
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I am your assistant. How can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ]);
    
  };

  return (
    <div className="flex flex-col h-screen bg-white">

      {/* Chat Window */}
      <ChatWindow messages={messages} />

      {/* Input Area */}
      <div className="p-4 flex w-full gap-2">
        <NewChatButton onNewChat={handleNewChat} />
        <InputArea
          content={content}
          setContent={setContent}
          handleSend={handleSend}
          isLoading={isLoading}
        />
      </div>


    </div>
  );
};

export default ChatBot;