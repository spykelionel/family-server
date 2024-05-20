const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "WElcome to my express server",
  });
});

module.exports = { app };
