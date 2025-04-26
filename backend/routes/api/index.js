const express = require('express');
const router = express.Router();

const spotsRouter = require('./spots');

router.use('/spots', spotsRouter);

module.exports = router;
