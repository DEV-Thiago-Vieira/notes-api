const express = require("express");
const router = express.Router();
const notesService = require("../service/notes.js");

/**
 * @swagger
 * /notes:
 *  get:
 *    tags:
 *    - Notes
 *    summary: Get all
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/", async (req, res) => {
  res.json(await notesService.getAllNotes());
});

/**
 * @swagger
 * /notes/{id}:
 *  get:
 *    tags:
 *    - Notes
 *    summary: Get by id
 *    parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await notesService.getNoteById(id));
});

/**
 * @swagger
 * /notes:
 *  post:
 *    tags:
 *    - Notes
 *    summary: Create
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *                 example: Anotação 1
 *               author:
 *                 type: string
 *                 example: Thiago
 *
 *    responses:
 *      201:
 *        description: Success
 */
router.post("/", async (req, res) => {
  const { content, author } = req.body;
  await notesService.createNote(content, author);
  res.status(201).send();
});

/**
 * @swagger
 * /notes/{id}:
 *  put:
 *    tags:
 *    - Notes
 *    summary: Update
 *    parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *                 example: Anotação 1
 *               author:
 *                 type: string
 *                 example: Thiago
 *
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;
  await notesService.updateNote(id, content, author);
  res.status(200).send();
});

/**
 * @swagger
 * /notes/{id}:
 *  delete:
 *    tags:
 *    - Notes
 *    summary: Delete by id
 *    parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the note
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await notesService.deleteNote(id);
  res.status(200).send();
});

module.exports = router;
