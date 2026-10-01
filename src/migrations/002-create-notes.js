module.exports = {
  up: async ({ context: db }) => {
    await db.query(`
      CREATE TABLE notes (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        content TEXT NOT NULL,
        userId CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_notes_user FOREIGN KEY (userId) REFERENCES users(id)
      )
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci;
    `);
  },

  down: async ({ context: db }) => {
    await db.query(`DROP TABLE notes`);
  },
};
