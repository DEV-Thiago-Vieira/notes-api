const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *    - Users
 *    description: default
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/", (req, res) => {
  res.json({
    title: "Name 1",
    content: "123",
  });
});

module.exports = router;
