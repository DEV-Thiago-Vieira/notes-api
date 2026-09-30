const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const packageJson = require("../../package.json");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      contact: {
        name: packageJson.author.name,
        email: packageJson.author.email,
        url: packageJson.author.url,
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3060/api/v1",
        description: "Local server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "Users endpoints",
      },
      {
        name: "Notes",
        description: "Notes endpoints",
      },
    ],
  },
  apis: ["./src/server.js", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
