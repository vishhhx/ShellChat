import express from "express";
import cors from "cors";
import { router as authRouter } from "./routers/auth.router";
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "API Server running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/auth", authRouter);
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

console.log("API Server started successfully");
