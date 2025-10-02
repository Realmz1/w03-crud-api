import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";
import { bookSchema } from "../validation/bookValidation.js";

const collection = "books";

export async function getBooks(req, res) {
  try {
    const db = getDB();
    const books = await db.collection(collection).find().toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getBook(req, res) {
  try {
    const db = getDB();
    const book = await db.collection(collection).findOne({ _id: new ObjectId(req.params.id) });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}

export async function createBook(req, res) {
  const { error, value } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDB();
    const result = await db.collection(collection).insertOne(value);
    res.status(201).json({ _id: result.insertedId, ...value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateBook(req, res) {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const db = getDB();
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: value }
    );
    if (!result.matchedCount) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book updated" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}

export async function deleteBook(req, res) {
  try {
    const db = getDB();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}
