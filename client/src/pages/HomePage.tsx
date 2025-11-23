import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // loading, нужно отложить рендер с формы, пока есть там имя или нет
  useEffect(() => {
    const storedName = localStorage.getItem("username"); // поменять на sessionStorage
    if (storedName) navigate("/chat");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem("username", name.trim());
    navigate("/chat");
  };

  // if (isLoading) {
  //   return {
  //     <Loader />
  //   }
  // }

  // if (storedName) {
  //   return <Redirect /> // на чат
  // }

  // обертку для localStorage

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl mb-6">Введите ваше имя</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="px-4 py-2 rounded-lg text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя..."
        />
        <button
          type="submit"
          className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
