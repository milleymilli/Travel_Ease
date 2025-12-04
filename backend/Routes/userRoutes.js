// backend/Routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUsers, createUser, signup, signin } = require("../Controllers/userController");

// Map the URL '/' to the functions
router.route("/").get(getUsers).post(createUser);
router.post('/signup', signup);
router.post('/signin', signin);
module.exports = router;
