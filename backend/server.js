const express = require("express");
const path = require("path");
require("dotenv").config();

const testRoutes = require("./Routes/testRoute");
/*For now we don't need CORS coz our API request and 
Frontend Html are from the same origin
const cors = require("cors")
*/

const bookingRoutes = require("./Routes/bookings");
const paymentRoutes = require("./Routes/payments");
const userRoutes = require("./Routes/userRoutes");
const destinationRoutes = require("./Routes/destinationRoutes");
const errorHandler = require("./Middleware/errorMiddleware");

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Allows server to read JSON data
app.use(express.static(path.join(__dirname, "..", "frontend")));

//Mounting our API Routes
app.use("/api/flights", testRoutes);

// Our basic route
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// Our basic route (Serves the Frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
