import { createBrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/chat", element: <ChatPage /> },
]);
