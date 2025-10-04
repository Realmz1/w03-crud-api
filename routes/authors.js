import express from "express";
import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorsController.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - nationality
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the author
 *         name:
 *           type: string
 *         birthYear:
 *           type: number
 *         nationality:
 *           type: string
 *         alive:
 *           type: boolean
 *         awards:
 *           type: array
 *           items:
 *             type: string
 *         bio:
 *           type: string
 *         website:
 *           type: string
 *       example:
 *         name: "Sofia Delgado"
 *         birthYear: 1984
 *         nationality: "Mexican"
 *         alive: true
 *         awards: ["Latin American Literary Prize"]
 *         bio: "Author blending magical realism with modern issues."
 *         website: "https://sofiadelgado.example.net"
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Returns all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: The list of authors
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *   put:
 *     summary: Update author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Author not found
 *   delete:
 *     summary: Delete author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID to delete
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
