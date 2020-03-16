const express = require("express");
const router = express.Router();

/**
 * Get Pong
 */
router.get("/", (req, res, next) => {
  res.status(200).send("Pong!");
});

module.exports = router;
