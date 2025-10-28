import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

interface ChatMessage {
  user: string;
  text: string;
  time: string;
}

const messages: ChatMessage[] = [];

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.emit("chatHistory", messages);

  socket.on("message", (msg: { user: string; text: string }) => {
    const fullMessage: ChatMessage = {
      ...msg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    messages.push(fullMessage);
    io.emit("message", fullMessage);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
