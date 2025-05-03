<<<<<<< HEAD
//backend/routes/api/index.js
const router = require('express').Router();
=======
const express = require('express');
const router = express.Router();
const reviewRoutes = require('./reviews');
>>>>>>> 0767e0a72711eb7d05072b7ca7d1d4c5c348191d

const spotsRouter = require('./spots');

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRoutes);

module.exports = router;
