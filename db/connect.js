import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client;
let db;

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    throw new Error("❌ MONGO_URI is not defined. Did you set it in Render Environment Variables?");
  }
  if (!dbName) {
    throw new Error("❌ DB_NAME is not defined. Did you set it in Render Environment Variables?");
  }

  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Connected to MongoDB database: ${dbName}`);
    return db;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    throw err;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("❌ Database not initialized. Call connectDB() first.");
  }
  return db;
}
