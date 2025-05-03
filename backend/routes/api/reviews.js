const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage } = require('../../db/models');

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  });

  res.json({ Reviews: reviews });
});

// Add an Image to a Review by Review ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.reviewId);

  if (!review || review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const imageCount = await ReviewImage.count({ where: { reviewId: review.id } });
  if (imageCount >= 10) {
    return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
  }

  const newImage = await ReviewImage.create({ reviewId: review.id, url });
  res.json({ id: newImage.id, url: newImage.url });
});

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const existingReview = await Review.findByPk(req.params.reviewId);

  if (!existingReview || existingReview.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  existingReview.review = review;
  existingReview.stars = stars;
  await existingReview.save();

  res.json(existingReview);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review || review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await review.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
