const db = require("../../db.js");
const AppError = require("../config/AppError.js");
async function getAllNotes() {
  const [notes] = await db.query("SELECT * FROM notes");
  return notes;
}

async function getNoteById(id) {
  if (!id) {
    throw new AppError("Id is required", 400);
  }

  const [notes] = await db.query("SELECT * FROM notes WHERE id = ? LIMIT 1", [
    id,
  ]);

  if (notes.length === 0) {
    throw new AppError("Note not found", 404);
  }

  return notes[0];
}

async function createNote(content, author) {
  if (!content || !author) {
    throw new AppError("content and author are required", 400);
  }

  await db.query(
    `INSERT INTO notes
     (id, content, author, createdAt, updatedAt)
     VALUES (UUID(), ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`,
    [content, author],
  );
}

async function updateNote(id, content, author) {
  if (!id || !content || !author) {
    throw new AppError("id, content and author are required", 400);
  }

  await getNoteById(id);

  await db.query(
    `UPDATE notes
     SET content = ?, author = ?, updatedAt = CURRENT_TIMESTAMP()
     WHERE id = ?`,
    [content, author, id],
  );
}

async function deleteNote(id) {
  if (!id) {
    throw new AppError("Id is required", 400);
  }

  await getNoteById(id);

  await db.query("DELETE FROM notes WHERE id = ?", [id]);
}

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
