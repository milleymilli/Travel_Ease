const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Our basic route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
