import { Server } from "socket.io";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3002;

const io = new Server(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

console.log(`Socket Server running on port ${PORT}`);
