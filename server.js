import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the W03 CRUD API" });
});

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error("❌ Failed to connect to DB:", err);
  process.exit(1);
});
