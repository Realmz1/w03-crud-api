import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export async function connectDB() {
  if (db) return db;
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("✅ Connected to MongoDB:", process.env.DB_NAME);
  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized. Call connectDB first.");
  return db;
}
