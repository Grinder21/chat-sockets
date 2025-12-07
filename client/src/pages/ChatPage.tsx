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
  const [message, setMessage] = useState("");
  const username = session.getUser();

  const handleIncomingMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleHistory = useCallback((msgs: ChatMessage[]) => {
    setMessages(msgs);
  }, []); // не нужен, можно использовать напрямую setMessages

  useEffect(() => {
    if (!session.getUser()) {
      navigate("/");
      return;
    }

    socket.emit("requestHistory");

    socket.on("chatHistory", handleHistory);
    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("chatHistory", handleHistory);
      socket.off("message", handleIncomingMessage);
    };
  }, [navigate, username, handleIncomingMessage, handleHistory]);

  const sendMessage = useCallback(() => {
    if (!message.trim()) return;
    socket.emit("message", { user: username, text: message });
    setMessage("");
  }, [message, username]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white relative overflow-hidden">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
