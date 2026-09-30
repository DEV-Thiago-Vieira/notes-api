const db = require("../../db.js");
const { BadRequestError, NotFoundError } = require("../config/AppError.js");
async function getAllNotes() {
  const [notes] = await db.query("SELECT * FROM notes");
  return notes;
}

async function getNoteById(id) {
  if (!id) {
    throw new BadRequestError("Id is required");
  }

  const [notes] = await db.query("SELECT * FROM notes WHERE id = ? LIMIT 1", [
    id,
  ]);

  if (notes.length === 0) {
    throw new NotFoundError("Note not found", { id });
  }

  return notes[0];
}

async function createNote(content, author) {
  if (!content || !author) {
    throw new BadRequestError("content and author are required");
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
    throw new BadRequestError("id, content and author are required");
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
    throw new BadRequestError("Id is required");
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
