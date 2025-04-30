const express = require('express');
const router = express.Router();
const reviewRoutes = require('./reviews');

const spotsRouter = require('./spots');

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRoutes);

module.exports = router;
