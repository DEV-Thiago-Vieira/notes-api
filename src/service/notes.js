const db = require("../../db.js");
const { BadRequestError, NotFoundError } = require("../config/AppError.js");
const Notes = require("../models/notes.js");
const User = require("../models/user.js");
const { getUserById } = require("../service/users.js");

async function getAllNotes() {
  const [notes] = await db.query("SELECT * FROM notes");
  const result = await Promise.all(
    notes.map(async (note) => {
      const user = new User(await getUserById(note.userId));
      return {
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),
  );
  return result;
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

  const note = notes[0];
  const user = new User(await getUserById(note.userId));

  const result = {
    id: note.id,
    content: note.content,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    author: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  return result;
}

async function createNote(content, userId) {
  if (!content || !userId) {
    throw new BadRequestError("content and author are required");
  }

  await db.query(`INSERT INTO notes(content, userId) VALUES (?, ?)`, [
    content,
    userId,
  ]);
}

async function updateNote({ id, content, userId }) {
  if (!id) {
    throw new BadRequestError("id is required.");
  }

  const { author, ...note } = await getNoteById(id);
  const notes = new Notes({ ...note, userId: author.id });
  notes.content = content ?? notes.content;
  notes.userId = userId ?? notes.userId;
  await getUserById(notes.userId);

  notes.content;
  await db.query(
    `UPDATE notes
     SET content = ?, userId = ?
     WHERE id = ?`,
    [notes.content, notes.userId, notes.id],
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
