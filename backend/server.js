const express = require("express");
const path = require("path");
/*For now we don't need CORS coz our API request and 
Frontend Html are from the same origin
const cors = require("cors")
*/
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Our basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
