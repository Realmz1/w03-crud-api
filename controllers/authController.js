import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../db/connect.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register new user
export async function register(req, res) {
  const db = getDB();
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const existing = await db.collection("users").findOne({ username });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({ username, password: hashed });
  res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
}

// Login user
export async function login(req, res) {
  const db = getDB();
  const { username, password } = req.body;

  const user = await db.collection("users").findOne({ username });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
}

// Logout (client just discards token)
export async function logout(req, res) {
  res.json({ message: "Logged out successfully" });
}

// Middleware to protect routes
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing authorization header" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
