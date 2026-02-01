import express from "express";
import cors from "cors";
import { registerUser } from "@repo/database/userServices";
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


app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
