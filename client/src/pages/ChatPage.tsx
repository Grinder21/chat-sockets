import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket";
import { session } from "../utils/session";
import type { ChatMessage } from "../types/chat";

import ChatHeader from "../components/Chat/ChatHeader";
import MessageList from "../components/Chat/MessageList";
import MessageInput from "../components/Chat/MessageInput";

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const username = session.getUser();

  const handleIncomingMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    socket.emit("requestHistory");

    socket.on("chatHistory", setMessages);
    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("chatHistory", setMessages);
      socket.off("message", handleIncomingMessage);
    };
  }, [navigate, username, handleIncomingMessage]);

  const sendMessage = useCallback(
    (text: string) => {
      socket.emit("message", { user: username, text });
    },
    [username]
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white relative overflow-hidden">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}
