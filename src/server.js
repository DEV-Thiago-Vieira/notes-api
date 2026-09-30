const express = require("express");
const usersRoutes = require("./routes/users");
const notesRoutes = require("./routes/notes");
const swagger = require("./config/swagger.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

app.use(swagger);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/notes", notesRoutes);

app.use(errorHandler);

app.listen(3060, () => {
  console.log("Running at http://localhost:3060/api-docs");
});
