const express = require('express');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { SpotImage } = require('../../db/models');

const router = express.Router();

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ gt: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// Get all Spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.json({ Spots: spots });
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving spots.' });
  }
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const spots = await Spot.findAll({
      where: { ownerId: userId }
    });

    res.json({ Spots: spots });
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving user spots.' });
  }
});

// Get details of a Spot by ID
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  res.json(spot);
});

// Add an Image to a Spot by ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the current user is the owner of the spot
  if (spot.ownerId !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Create the image
  const newImage = await SpotImage.create({
    spotId,
    url,
    preview
  });

  // Return only id, url, preview in the response
  res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview
  });
});

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  const spot = await Spot.findByPk(spotId);

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the current user is the owner of the spot
  if (spot.ownerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Update the spot with the provided details
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;

  await spot.save();

  res.json(spot);
});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { user } = req;

  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  res.status(201).json(newSpot);
});

// Get all Reviews of the Current User
router.get('/reviews/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const reviews = await Review.findAll({
      where: { userId }
    });

    res.json({ Reviews: reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving reviews.' });
  }
});

// Get all Reviews by a Spot's ID
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  try {
    const reviews = await Review.findAll({
      where: { spotId }
    });

    res.json({ Reviews: reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving reviews.' });
  }
});

// Create a Review for a Spot by Spot ID
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(spotId);

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the user has already reviewed this spot
  const existingReview = await Review.findOne({
    where: { spotId, userId: user.id }
  });

  if (existingReview) {
    return res.status(403).json({ message: 'You have already reviewed this spot' });
  }

  // Create the review
  const newReview = await Review.create({
    spotId,
    userId: user.id,
    review,
    stars
  });

  res.status(201).json(newReview);
});

// Add an Image to a Review by Review ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;  // Assuming 'url' is passed for the image
  const userId = req.user.id;

  const review = await Review.findByPk(reviewId);

  // Check if the review exists
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  // Check if the current user is the owner of the review
  if (review.userId !== userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Assuming you have a ReviewImage model to store review images
  const newImage = await ReviewImage.create({
    reviewId,
    url
  });

  res.json({
    id: newImage.id,
    url: newImage.url
  });
});

// Edit a Review by Review ID
router.put('/:reviewId', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { user } = req;
  const { review, stars } = req.body;

  const existingReview = await Review.findByPk(reviewId);

  // Check if the review exists
  if (!existingReview) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  // Check if the current user is the owner of the review
  if (existingReview.userId !== user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Update the review
  existingReview.review = review;
  existingReview.stars = stars;

  await existingReview.save();

  res.json(existingReview);
});

// Delete a Review by Review ID
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { user } = req;

  const review = await Review.findByPk(reviewId);

  // Check if the review exists
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  // Check if the current user is the owner of the review
  if (review.userId !== user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Delete the review
  await review.destroy();

  res.json({ message: 'Successfully deleted' });
});

// Delete a Spot Image by Spot ID and Image ID
router.delete('/:spotId/images/:imageId', requireAuth, async (req, res) => {
  const { spotId, imageId } = req.params;
  const { user } = req;

  const spot = await Spot.findByPk(spotId);

  // Check if the spot exists
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the current user is the owner of the spot
  if (spot.ownerId !== user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Find the image to delete
  const image = await SpotImage.findOne({
    where: {
      spotId,
      id: imageId
    }
  });

  // Check if the image exists
  if (!image) {
    return res.status(404).json({ message: "Image couldn't be found" });
  }

  // Delete the image
  await image.destroy();

  res.json({ message: 'Successfully deleted' });
});

// Delete a Review Image by Review ID and Image ID
router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res) => {
  const { reviewId, imageId } = req.params;
  const { user } = req;

  const review = await Review.findByPk(reviewId);

  // Check if the review exists
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  // Check if the current user is the owner of the review
  if (review.userId !== user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Find the image to delete
  const image = await ReviewImage.findOne({
    where: {
      reviewId,
      id: imageId
    }
  });

  // Check if the image exists
  if (!image) {
    return res.status(404).json({ message: "Image couldn't be found" });
  }

  // Delete the image
  await image.destroy();

  res.json({ message: 'Successfully deleted' });
});

// Get all spots with optional filters
router.get('/', async (req, res) => {
  const { city, state, country, minPrice, maxPrice, name } = req.query;

  // Build query filter object
  const filter = {};
  
  if (city) filter.city = city;
  if (state) filter.state = state;
  if (country) filter.country = country;
  if (name) filter.name = { [Op.iLike]: `%${name}%` }; // Case-insensitive partial match
  if (minPrice) filter.price = { [Op.gte]: parseFloat(minPrice) }; // Min price filter
  if (maxPrice) filter.price = { ...filter.price, [Op.lte]: parseFloat(maxPrice) }; // Max price filter

  try {
    const spots = await Spot.findAll({
      where: filter,
    });

    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving spots', error: err });
  }
});

module.exports = router;
