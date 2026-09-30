const { Umzug } = require("umzug");
const db = require("../../db");
const MySQLStorage = require("./mysqlStorage");

const migrator = new Umzug({
  migrations: {
    glob: "src/migrations/*.js",
  },

  context: db,

  storage: new MySQLStorage(db),
});

module.exports = migrator;
