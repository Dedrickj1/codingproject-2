const express = require('express');
const router = express.Router();
const apiRouter = require('./spots'); // Import your API routes

router.use('/api', apiRouter); // Use the apiRouter at /api

module.exports = router; 