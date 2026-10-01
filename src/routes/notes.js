const express = require("express");
const router = express.Router();
const notesService = require("../service/notes.js");

/**
 * @swagger
 * /notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get all notes
 *     responses:
 *       200:
 *         description: Successfully retrieved all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *                   content:
 *                     type: string
 *                     example: Anotação 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   author:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *                       name:
 *                         type: string
 *                         example: Thiago
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: thiago@example.com
 */
router.get("/", async (req, res) => {
  res.json(await notesService.getAllNotes());
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get note by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     responses:
 *       200:
 *         description: Successfully retrieved the note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 content:
 *                   type: string
 *                   example: Anotação 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                       example: Thiago
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: thiago@example.com
 *       404:
 *         description: Note not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await notesService.getNoteById(id));
});

/**
 * @swagger
 * /notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create a note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *                 example: Anotação 1
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     responses:
 *       201:
 *         description: Note successfully created
 *       400:
 *         description: Invalid note data
 */
router.post("/", async (req, res) => {
  const { content, userId } = req.body;

  await notesService.createNote(content, userId);

  res.status(201).send();
});

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     tags:
 *       - Notes
 *     summary: Update a note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *                 example: Anotação atualizada
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     responses:
 *       200:
 *         description: Note successfully updated
 *       400:
 *         description: Invalid note data
 *       404:
 *         description: Note not found
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, userId } = req.body;

  await notesService.updateNote({ id, content, userId });

  res.status(200).send();
});

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Delete note by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     responses:
 *       200:
 *         description: Note successfully deleted
 *       404:
 *         description: Note not found
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await notesService.deleteNote(id);

  res.status(200).send();
});

module.exports = router;
