import { SendHorizonal } from "lucide-react";
import { useCallback, useState } from "react";

interface Props {
  sendMessage: (text: string) => void;
}

export default function MessageInput({ sendMessage }: Props) {
  const [message, setMessage] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed) return;

    sendMessage(trimmed);
    setMessage("");
  }, [message, sendMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
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
  );
}
