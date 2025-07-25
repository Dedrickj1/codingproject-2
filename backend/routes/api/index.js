// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js'); 
const reviewsRouter = require('./reviews.js') 
const spotImagesRouter = require('./spot-images.js') 
const reviewImagesRouter = require('./review-images.js') 
const bookingsRouter = require('./bookings.js') 
const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter) 
router.use('/reviews', reviewsRouter) 
router.use('/spot-images', spotImagesRouter) 
router.use('/review-images', reviewImagesRouter) 
router.use('/bookings', bookingsRouter) 

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;