class MySQLStorage {
  constructor(db) {
    this.db = db;
  }

  async init() {
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async executed() {
    await this.init();

    const [rows] = await this.db.query(`
      SELECT name
      FROM migrations
      ORDER BY id
    `);

    return rows.map((row) => row.name);
  }

  async logMigration({ name }) {
    await this.init();

    await this.db.query(
      `INSERT INTO migrations (name) VALUES (?)`,
      [name],
    );
  }

  async unlogMigration({ name }) {
    await this.init();

    await this.db.query(
      `DELETE FROM migrations WHERE name = ?`,
      [name],
    );
  }
}

module.exports = MySQLStorage;