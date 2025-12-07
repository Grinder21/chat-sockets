import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/UI/Loader";
import { session } from "../utils/session";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = session.getUser();
    if (storedName) navigate("/chat"); // роутинг с Redirect
    setIsLoading(false);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    session.setUser(name.trim());
    navigate("/chat");
  }; // забыл обернуть в useCallback

  if (isLoading) return <Loader />;

  // убрать Loader и поставить его на ChatPage

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white px-4">
      <div className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10">
        <h1 className="text-lg sm:text-lg text-center mb-6">
          Введите ваше имя
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-3 rounded-xl bg-slate-900/60 border border-white/20 text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя..."
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl font-medium transition shadow-md"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
