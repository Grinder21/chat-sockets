import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SendHorizonal } from "lucide-react";
import socket from "../socket";

interface ChatMessage {
  user: string;
  text: string;
  time: string;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    socket.on("chatHistory", (msgs: ChatMessage[]) => setMessages(msgs));
    // механизм подписки
    socket.on("message", (msg: ChatMessage) =>
      setMessages((prev) => [...prev, msg])
    );

    // snapshot

    return () => {
      socket.off("message");
      socket.off("chatHistory");
    };
  }, [navigate, username]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    socket.emit("message", { user: username, text: message });
    setMessage("");
  };

  // useCallback

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(30,64,175,0.25),_transparent_60%)]" />

      <header className="p-4 bg-slate-900/60 backdrop-blur-md text-center font-semibold text-lg shadow-lg border-b border-slate-700 z-10">
        Общий чат
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg, i) => {
          const isMine = msg.user === username;
          return (
            <div
              key={i}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              } animate-fadeIn`}
            >
              <div
                className={`group relative max-w-[70%] px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                  isMine
                    ? "bg-indigo-600/90 text-white rounded-br-none"
                    : "bg-slate-700/80 text-slate-50 rounded-bl-none"
                }`}
              >
                <div className="text-xs font-semibold opacity-75 mb-1">
                  {msg.user}
                </div>

                <div className="text-sm leading-snug whitespace-pre-wrap break-words">
                  {msg.text}
                </div>

                <div className="flex justify-end text-[10px] text-gray-300 opacity-70 group-hover:opacity-100 transition-opacity">
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 bg-slate-900/70 backdrop-blur-lg border-t border-slate-700 flex items-center gap-3 sticky bottom-0 z-20"
      >
        <input
          className="flex-1 px-4 py-2 rounded-full text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Введите сообщение..."
        />
        <button
          type="submit"
          className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all shadow-lg border border-white/20"
          title="Отправить"
        >
          <SendHorizonal size={20} className="text-indigo-300" />
        </button>
      </form>
    </div>
  );
}
