import React from "react";

interface Message {
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

interface ChatDrawerProps {
  conversations: Conversation[];
  onConversationSelect: (id: number) => void;
  onCloseDrawer: () => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ conversations, onConversationSelect, onCloseDrawer }) => {

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 3) + '...';
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <div className="flex items-center justify-between bg-primary p-5">
        <h2 className="text-3xl font-semibold">Chats</h2>
        <button className=" hover:text-gray-700 focus:outline-none" onClick={onCloseDrawer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <ul className="divide-y divide-gray-300 flex-1 overflow-y-auto">
        {conversations.map((conversation : Conversation) => (
          <li key={conversation.id} className="py-2 hover:bg-secondary-dark px-4">
            <button
              className="w-full text-left flex items-center px-2 py-1 rounded-md"
              onClick={() => onConversationSelect(conversation.id)}
            >
               <div className={`w-10 h-10 rounded-full font-bold text-2xl flex items-center justify-center mr-2 bg-slate-200`}>
                {conversation.title.substring(0, 1)}
              </div>
              <div>
                <div className="font-semibold">{conversation.title}</div>
                <div className="text-sm text-gray-600">
                  {conversation.messages.length > 0 && (
                    <>
                      <span className="truncate">{`${truncateText(conversation.messages[conversation.messages.length - 1].text, 30)}`}</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {conversation.messages.length > 0 && conversation.messages[conversation.messages.length - 1].timestamp}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatDrawer;


