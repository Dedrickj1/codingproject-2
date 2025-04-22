//backend/routes/api/index.js
const router = require('express').Router();

// Test route to check if API router is working
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});


module.exports = router;