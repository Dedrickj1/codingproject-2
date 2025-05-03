const express = require('express');
const router = express.Router();

router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
});

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

<<<<<<< HEAD
const apiRouter = require('./api');
=======
>>>>>>> 0767e0a72711eb7d05072b7ca7d1d4c5c348191d

router.get('/', (req, res) => {
  res.send('API is running');
});

const apiRouter = require('./api');

// Connect the API router
router.use('/api', apiRouter);

module.exports = router;
