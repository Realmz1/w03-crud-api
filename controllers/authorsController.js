import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";
import { authorSchema } from "../validation/authorValidation.js";

const collection = "authors";

// GET all authors
export async function getAuthors(req, res) {
  try {
    const db = getDB();
    const authors = await db.collection(collection).find().toArray();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET one author
export async function getAuthor(req, res) {
  try {
    const db = getDB();
    const author = await db.collection(collection).findOne({ _id: new ObjectId(req.params.id) });
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}

// CREATE author
export async function createAuthor(req, res) {
  const { error, value } = authorSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDB();
    const result = await db.collection(collection).insertOne(value);
    res.status(201).json({ _id: result.insertedId, ...value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// UPDATE author
export async function updateAuthor(req, res) {
  const { error, value } = authorSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDB();
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: value }
    );
    if (!result.matchedCount) return res.status(404).json({ error: "Author not found" });
    res.json({ message: "Author updated" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}

// DELETE author
export async function deleteAuthor(req, res) {
  try {
    const db = getDB();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ error: "Author not found" });
    res.json({ message: "Author deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}
