// backend/Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../Controllers/userController');

// Map the URL '/' to the functions
router.route('/').get(getUsers).post(createUser);

module.exports = router;