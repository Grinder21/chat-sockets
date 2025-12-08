import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../../types/chat";

interface Props {
  messages: ChatMessage[];
}

export default function MessageList({ messages }: Props) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
