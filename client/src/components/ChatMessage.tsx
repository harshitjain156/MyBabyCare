// ChatMessage.js
import React from "react";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
  isMyMessage: any;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isMyMessage }) => {
  const containerClassName = isMyMessage ? "justify-end" : "justify-start";
  const messageClassName = isMyMessage ? "bg-secondary-dark text-white" : "bg-gray-300";

  return (
    <div className={`flex ${containerClassName} mb-2`}>
      <div className={`flex items-center max-w-xs`}>
        <div className={`w-8 h-8 rounded-full flex  items-center justify-center mr-2 ${isMyMessage ? 'ml-2' : 'mr-2'} ${messageClassName}`}>
          {message.sender.substring(0, 1)}
        </div>
        <div className={`p-2 rounded-lg ${messageClassName} max-w-md`}>
          {message.text}
          <div className="text-xs text-gray-500">{message.timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

