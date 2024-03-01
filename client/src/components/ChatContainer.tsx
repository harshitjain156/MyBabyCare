

import React, { useState } from "react";
import Chat from "./Chat";
import ChatDrawer from "./ChatDrawer";

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

interface ChatContainerProps {
  hideChatContainer: boolean;
  setHideChatContainer: React.Dispatch<React.SetStateAction<boolean>>;
  createMeetingHandler :  () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ hideChatContainer, setHideChatContainer, createMeetingHandler }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);

  const conversations: Conversation[] = [
    // Conversation data
    {
      id: 1,
      title: "Dr. Smith",
      online: true,
      messages: [
        { id: 1, sender: "Dr. Smith", text: "Good morning!", timestamp: "10:00 AM" },
        { id: 2, sender: "Dr. Smith", text: "How are you feeling today?", timestamp: "10:05 AM" },
        { id: 3, sender: "You", text: "Good morning, I'm feeling better, thank you.", timestamp: "10:10 AM" },
        { id: 4, sender: "You", text: "I have some concerns about my medication.", timestamp: "10:15 AM" },
        { id: 5, sender: "Dr. Smith", text: "Sure, let's discuss it.", timestamp: "10:20 AM" }
      ]
    },
    {
      id: 2,
      title: "Dr. Johnson",
      online: false,
      messages: [
        { id: 1, sender: "You", text: "Hello, Dr. Johnson.", timestamp: "11:00 AM" },
        { id: 2, sender: "Dr. Johnson", text: "Hi, how can I assist you today?", timestamp: "11:05 AM" },
        { id: 3, sender: "You", text: "I'm experiencing some discomfort in my back.", timestamp: "11:10 AM" },
        { id: 4, sender: "Dr. Johnson", text: "Let's schedule an appointment for a checkup.", timestamp: "11:15 AM" }
      ]
    },
    // Add more conversations here
    {
      id: 3,
      title: "Dr. Patel",
      online: true,
      messages: [
        { id: 1, sender: "You", text: "Hello, Dr. Patel.", timestamp: "12:00 PM" },
        { id: 2, sender: "Dr. Patel", text: "Good afternoon! How can I help you today?", timestamp: "12:05 PM" },
        { id: 3, sender: "You", text: "I've been having headaches lately.", timestamp: "12:10 PM" },
        { id: 4, sender: "Dr. Patel", text: "Let's schedule an appointment to discuss your symptoms.", timestamp: "12:15 PM" }
      ]
    },
    {
      id: 4,
      title: "Dr. Garcia",
      online: true,
      messages: [
        { id: 1, sender: "Dr. Garcia", text: "Good morning, how are you feeling?", timestamp: "9:00 AM" },
        { id: 2, sender: "You", text: "Hello, Dr. Garcia. I've been experiencing some pain in my joints.", timestamp: "9:05 AM" },
        { id: 3, sender: "You", text: "It started a few days ago and hasn't improved.", timestamp: "9:10 AM" },
        { id: 4, sender: "Dr. Garcia", text: "Let's set up an appointment for a checkup.", timestamp: "9:15 AM" }
      ]
    },
    {
      id: 5,
      title: "Dr. Lee",
      online: false,
      messages: [
        { id: 1, sender: "Dr. Lee", text: "Hello! How can I assist you today?", timestamp: "3:00 PM" },
        { id: 2, sender: "You", text: "Good afternoon, Dr. Lee. I've been feeling tired lately.", timestamp: "3:05 PM" },
        { id: 3, sender: "You", text: "And I'm having trouble sleeping at night.", timestamp: "3:10 PM" },
        { id: 4, sender: "Dr. Lee", text: "Let's discuss your symptoms in detail.", timestamp: "3:15 PM" }
      ]
    },
    {
      id: 6,
      title: "Dr. Wang",
      online: true,
      messages: [
        { id: 1, sender: "You", text: "Hello, Dr. Wang.", timestamp: "2:00 PM" },
        { id: 2, sender: "Dr. Wang", text: "Hi there! What brings you in today?", timestamp: "2:05 PM" },
        { id: 3, sender: "You", text: "I've been feeling anxious lately.", timestamp: "2:10 PM" },
        { id: 4, sender: "Dr. Wang", text: "Let's discuss ways to manage your anxiety.", timestamp: "2:15 PM" }
      ]
    },
    {
      id: 7,
      title: "Dr. Martinez",
      online: true,
      messages: [
        { id: 1, sender: "Dr. Martinez", text: "Good morning! How are you feeling today?", timestamp: "8:00 AM" },
        { id: 2, sender: "You", text: "Hello, Dr. Martinez. I've been feeling tired lately.", timestamp: "8:05 AM" },
        { id: 3, sender: "You", text: "And I'm experiencing some stomach pain.", timestamp: "8:10 AM" },
        { id: 4, sender: "Dr. Martinez", text: "Let's schedule an appointment to discuss your symptoms.", timestamp: "8:15 AM" }
      ]
    },
    {
      id: 8,
      title: "Dr. Nguyen",
      online: false,
      messages: [
        { id: 1, sender: "You", text: "Hello, Dr. Nguyen.", timestamp: "1:00 PM" },
        { id: 2, sender: "Dr. Nguyen", text: "Hi there! What can I help you with today?", timestamp: "1:05 PM" },
        { id: 3, sender: "You", text: "I've been having trouble with my allergies.", timestamp: "1:10 PM" },
        { id: 4, sender: "Dr. Nguyen", text: "Let's discuss your symptoms and find a solution.", timestamp: "1:15 PM" }
      ]
    },
    {
      id: 9,
      title: "Dr. Taylor",
      online: true,
      messages: [
        { id: 1, sender: "Dr. Taylor", text: "Good morning! How are you feeling today?", timestamp: "7:00 AM" },
        { id: 2, sender: "You", text: "Hello, Dr. Taylor. I've been feeling unwell lately.", timestamp: "7:05 AM" },
        { id: 3, sender: "You", text: "I'm experiencing some congestion and coughing.", timestamp: "7:10 AM" },
        { id: 4, sender: "Dr. Taylor", text: "Let's set up an appointment for a checkup.", timestamp: "7:15 AM" }
      ]
    },
    {
      id: 10,
      title: "Dr. Anderson",
      online: true,
      messages: [
        { id: 1, sender: "Dr. Anderson", text: "Good morning! How can I assist you today?", timestamp: "6:00 AM" },
        { id: 2, sender: "You", text: "Hello, Dr. Anderson. I've been having trouble sleeping.", timestamp: "6:05 AM" },
        { id: 3, sender: "You", text: "And I'm feeling fatigued during the day.", timestamp: "6:10 AM" },
        { id: 4, sender: "Dr. Anderson", text: "Let's discuss your symptoms and possible treatments.", timestamp: "6:15 AM" }
      ]
    },
  ];

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversationId(conversationId);
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

  return (
    <div className={`position fixed top-0 right-0 w-full md:w-2/6 z-40 h-screen transition-transform ${
      hideChatContainer ? "transform translate-x-full" : "transform translate-x-0"
    }`}>
      <div className={`transition-all ${selectedConversationId ? 'hidden' : 'block'}`}>
        <ChatDrawer conversations={conversations} onConversationSelect={handleConversationSelect} onCloseDrawer={() => setHideChatContainer(true)} />
      </div>
      <div className={`${selectedConversationId ? 'block' : 'hidden'}`}>
        {selectedConversation ? <Chat conversation={selectedConversation} createMeetingHandler={createMeetingHandler} hideFullChat={()=>setHideChatContainer(true)}  onClose={() => {
          setSelectedConversationId(null)
        }} /> : <div className="h-full flex items-center justify-center">Select a conversation to start chatting</div>}
      </div>
    </div>
  );
};

export default ChatContainer;
