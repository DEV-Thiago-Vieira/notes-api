const express = require("express");
const router = express.Router();
const usersService = require("../service/users.js");

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 */
router.get("/", async (req, res) => {
  res.json(await usersService.getAllUsers());
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await usersService.getUserById(id));
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Thiago
 *               email:
 *                 type: string
 *                 format: email
 *                 example: thiago@example.com
 *               password:
 *                 type: string
 *                 example: mySecretPassword
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid user data
 */
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  await usersService.createUser({
    name,
    email,
    password,
  });

  res.status(201).send();
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Thiago
 *               email:
 *                 type: string
 *                 format: email
 *                 example: thiago@example.com
 *               password:
 *                 type: string
 *                 example: newSecretPassword
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Invalid user data
 *       404:
 *         description: User not found
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  await usersService.updateUser({
    id,
    name,
    email,
    password,
  });

  res.status(200).send();
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *           format: uuid
 *         example: b9c9be60-bcd6-11f1-9de5-94921ddaef20
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await usersService.deleteUser(id);

  res.status(200).send();
});

module.exports = router;
