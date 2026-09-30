require("dotenv").config();

const migrator = require("./config/migrator");

migrator
  .up()
  .then(() => {
    console.log("Migrations completed.");
  })
  .catch((error) => {
    console.error("Migration failed: ", error);
    process.exit(1);
  });
