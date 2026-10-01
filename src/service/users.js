const db = require("../../db.js");
const { BadRequestError, NotFoundError } = require("../config/AppError.js");
const User = require("../models/user.js");

async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

async function getUserById(id) {
  if (!id) {
    throw new BadRequestError("Id is required");
  }

  const [rows] = await db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [
    id,
  ]);

  if (rows.length === 0) {
    throw new NotFoundError("User not found", { id });
  }

  return rows[0];
}

async function createUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new BadRequestError("name, email and password are required.");
  }

  await db.query(`INSERT INTO users(name, email, password) VALUES (?, ?, ?)`, [
    name,
    email,
    password,
  ]);
}

async function updateUser({ id, name, email, password }) {
  if (!id) {
    throw new BadRequestError("id is required");
  }

  const data = await getUserById(id);
  const user = new User(data);

  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.password = password ?? user.password;

  await db.query(
    `UPDATE users
     SET name = ?, email = ?, password = ?
     WHERE id = ?`,
    [user.name, user.email, user.password, user.id],
  );
}

async function deleteUser(id) {
  if (!id) {
    throw new BadRequestError("Id is required");
  }

  await getUserById(id);

  await db.query("DELETE FROM users WHERE id = ?", [id]);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
