import type { ChatMessage } from "../../types/chat";
import { session } from "../../utils/session";

interface Props {
  msg: ChatMessage;
}

export default function MessageBubble({ msg }: Props) {
  const username = session.getUser();
  const isMine = msg.user === username;

  return (
    <div
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
        <div className="text-xs font-semibold opacity-75 mb-1">{msg.user}</div>

        <div className="text-sm leading-snug whitespace-pre-wrap break-words">
          {msg.text}
        </div>

        <div className="flex justify-end text-[10px] text-gray-300 opacity-70 group-hover:opacity-100 transition-opacity">
          {msg.time}
        </div>
      </div>
    </div>
  );
}
