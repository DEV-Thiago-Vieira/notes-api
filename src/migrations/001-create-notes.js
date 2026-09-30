module.exports = {
  up: async ({ context: db }) => {
    await db.query(`
      CREATE TABLE notes (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci;
    `);
  },

  down: async ({ context: db }) => {
    await db.query(`DROP TABLE test_notes`);
  },
};
