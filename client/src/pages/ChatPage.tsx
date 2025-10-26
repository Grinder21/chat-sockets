import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [navigate, username]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("message", { user: username, text: message });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 flex gap-2 bg-slate-700">
        <input
          className="flex-1 px-4 py-2 rounded-lg text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button
          type="submit"
          className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
