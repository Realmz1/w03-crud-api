import { ObjectId } from "mongodb";
import { getDB } from "../db/connect.js";

export async function getContacts(req, res) {
  const db = getDB();
  const contacts = await db.collection("contacts").find().toArray();
  res.json(contacts);
}

export async function getContact(req, res) {
  const db = getDB();
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

  const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });
  contact ? res.json(contact) : res.status(404).json({ error: "Contact not found" });
}

export async function createContact(req, res) {
  const db = getDB();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday)
    return res.status(400).json({ error: "All fields are required" });

  const result = await db.collection("contacts").insertOne({
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  });
  res.status(201).json({ insertedId: result.insertedId });
}

export async function updateContact(req, res) {
  const db = getDB();
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

  const updated = await db.collection("contacts").updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  updated.modifiedCount
    ? res.json({ success: true })
    : res.status(404).json({ error: "Contact not found" });
}

export async function deleteContact(req, res) {
  const db = getDB();
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

  const deleted = await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });
  deleted.deletedCount
    ? res.json({ success: true })
    : res.status(404).json({ error: "Contact not found" });
}
