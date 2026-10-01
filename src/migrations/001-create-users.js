module.exports = {
  up: async ({ context: db }) => {
    await db.query(`
      CREATE TABLE users (
        id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
      DEFAULT CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci;
    `);
  },

  down: async ({ context: db }) => {
    await db.query(`DROP TABLE users`);
  },
};
