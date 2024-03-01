import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ScrollableFeed from 'react-scrollable-feed';
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  title: string;
  online: boolean;
  messages: Message[];
}

interface ChatProps {
  conversation: Conversation;
  onClose: () => void;
  createMeetingHandler: () => void;
  hideFullChat: ()=>void;
}

const Chat: React.FC<ChatProps> = ({ conversation, onClose, createMeetingHandler, hideFullChat }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj: Message = {
        id: conversation.messages.length + 1,
        sender: "You",
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      conversation.messages.push(newMessageObj);
      setNewMessage("");
      setIsTyping(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderStatus = () => {
    if (isTyping) {
      return "Typing...";
    } else if (conversation.online) {
      return "Online";
    } else {
      return "Offline";
    }
  };

  const isMyMessage = (sender: string) => sender === "You";

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex items-center justify-between bg-primary px-2 py-4">
        <div className="flex items-center">
          <button className="hover:text-gray-700 focus:outline-none" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </button>
          <div className={`w-10 h-10 rounded-full font-bold text-2xl flex items-center justify-center mr-2 bg-slate-200`}>
            {conversation.title.substring(0, 1)}
          </div>
          <div className="ml-2">
            <div className="text-lg font-semibold">{conversation.title}</div>
            <div className="flex items-center">
              <span className="text-xs">{renderStatus()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-4"><a target="blank" href="https://videofeature.onrender.com/">
          <button className="rounded-full p-2 bg-slate-300 hover:text-gray-600 focus:outline-none" onClick={()=>{
           
            hideFullChat();
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
            </svg>
          </button></a>
        </div>
      </div>
      <ScrollableFeed className="flex-1 overflow-y-auto p-4  scroll-smooth h-full">
        {conversation.messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isMyMessage={isMyMessage(message.sender)}
          />
        ))}
      </ScrollableFeed>
      <div className="my-4 flex px-4">
        <input
          type="text"
          className="w-full px-4 py-4 rounded-md border border-gray-300 focus:outline-none focus:border-secondary-dark"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="mx-2 px-6 py-4 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:bg-secondary-dark"
          onClick={handleSendMessage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
