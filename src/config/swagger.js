const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "A REST API for managing users and notes.",
      contact: {
        name: "API Support",
        email: "support@example.com",
        url: "https://example.com/support",
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
        name: "Test",
        description: "Test endpoints",
      },
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
