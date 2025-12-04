const express = require("express");
const path = require("path");
require("dotenv").config();

const testRoutes = require("./Routes/testRoute");
/*For now we don't need CORS coz our API request and 
Frontend Html are from the same origin
const cors = require("cors")
*/

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

//Mounting our API Routes
app.use("/api/flights", testRoutes);

// Our basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
