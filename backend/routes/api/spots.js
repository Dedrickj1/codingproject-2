const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, ReviewImage, Booking, Review, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

const formatSpotResponse = (spot) => {
    if (spot.Reviews && spot.Reviews.length > 0) {
        const totalStars = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
        spot.avgRating = parseFloat((totalStars / spot.Reviews.length).toFixed(1));
    } else {
        spot.avgRating = null;
    }
    delete spot.Reviews;

    if (spot.SpotImages && spot.SpotImages.length > 0) {
        const preview = spot.SpotImages.find(image => image.preview === true);
        spot.previewImage = preview ? preview.url : 'No preview image available';
    } else {
        spot.previewImage = 'No preview image available';
    }
    delete spot.SpotImages;

    return spot;
};

const handleSequelizeError = (error, res) => {
    const validationErrors = {};
    error.errors.forEach(err => {
        switch (err.path) {
            case 'address': validationErrors.address = "Street address is required";
            case 'city': validationErrors.city = "City is required"; 
            case 'state': validationErrors.state = "State is required"; 
            case 'country': validationErrors.country = "Country is required"; 
            case 'lat': validationErrors.lat = "Latitude must be within -90 and 90"; 
            case 'lng': validationErrors.lng = "Longitude must be within -180 and 180"; 
            case 'name': validationErrors.name = "Name must be less than 50 characters"; 
            case 'description': validationErrors.description = "Description is required"; 
            case 'price': validationErrors.price = "Price per day must be a positive number"; 
        }
    });

    return res.status(400).json({
        message: "Bad Request",
        errors: validationErrors
    });
};

router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const pageNum = parseInt(page) || 1;
    const sizeNum = parseInt(size) || 20;

    const queryErrors = {};
    if (pageNum < 1) queryErrors.page = "Page must be greater than or equal to 1";
    if (sizeNum < 1 || sizeNum > 20) queryErrors.size = "Size must be between 1 and 20";
    if (minLat !== undefined && (isNaN(parseFloat(minLat)) || parseFloat(minLat) < -90)) queryErrors.minLat = "Minimum latitude is invalid";
    if (maxLat !== undefined && (isNaN(parseFloat(maxLat)) || parseFloat(maxLat) > 90)) queryErrors.maxLat = "Maximum latitude is invalid";
    if (minLng !== undefined && (isNaN(parseFloat(minLng)) || parseFloat(minLng) < -180)) queryErrors.minLng = "Minimum longitude is invalid";
    if (maxLng !== undefined && (isNaN(parseFloat(maxLng)) || parseFloat(maxLng) > 180)) queryErrors.maxLng = "Maximum longitude is invalid";
    if (minPrice !== undefined && (isNaN(parseFloat(minPrice)) || parseFloat(minPrice) < 0)) queryErrors.minPrice = "Minimum price must be greater than or equal to 0";
    if (maxPrice !== undefined && (isNaN(parseFloat(maxPrice)) || parseFloat(maxPrice) < 0)) queryErrors.maxPrice = "Maximum price must be greater than or equal to 0";

    if (Object.keys(queryErrors).length > 0) {
        return res.status(400).json({ message: "Bad Request", errors: queryErrors });
    }

    const whereClause = {
        lat: { [Op.between]: [minLat ? parseFloat(minLat) : -90, maxLat ? parseFloat(maxLat) : 90] },
        lng: { [Op.between]: [minLng ? parseFloat(minLng) : -180, maxLng ? parseFloat(maxLng) : 180] },
        price: { [Op.between]: [minPrice ? parseFloat(minPrice) : 0, maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER] }
    };

    const allSpots = await Spot.findAll({
        where: whereClause,
        limit: sizeNum,
        offset: (pageNum - 1) * sizeNum,
        include: [
            { model: SpotImage, attributes: ['url', 'preview'] },
            { model: Review, attributes: ['stars'], required: false }
        ]
    });

    const formattedSpots = allSpots.map(spot => formatSpotResponse(spot.toJSON()));

    res.json({ Spots: formattedSpots, page: pageNum, size: sizeNum });
});

router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;
    const userSpots = await Spot.findAll({
        where: { ownerId: currentUserId },
        include: [
            { model: Review, attributes: ['stars'], required: false },
            { model: SpotImage, attributes: ['url', 'preview'], required: false },
        ],
    });

    const spotsList = userSpots.map(spot => {
        const formatted = formatSpotResponse(spot.toJSON());
        return {
            id: formatted.id,
            ownerId: formatted.ownerId,
            address: formatted.address,
            city: formatted.city,
            state: formatted.state,
            country: formatted.country,
            lat: formatted.lat,
            lng: formatted.lng,
            name: formatted.name,
            description: formatted.description,
            price: formatted.price,
            createdAt: formatted.createdAt,
            updatedAt: formatted.updatedAt,
            avgRating: formatted.avgRating,
            previewImage: formatted.previewImage
        };
    });
    
    res.json({ Spots: spotsList });
});

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: Review, attributes: ['stars'], required: false }
        ]
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const spotDetails = spot.toJSON();
    const reviewCount = spotDetails.Reviews.length;
    const totalStars = spotDetails.Reviews.reduce((sum, review) => sum + review.stars, 0);

    const responsePayload = {
        id: spotDetails.id,
        ownerId: spotDetails.ownerId,
        address: spotDetails.address,
        city: spotDetails.city,
        state: spotDetails.state,
        country: spotDetails.country,
        lat: spotDetails.lat,
        lng: spotDetails.lng,
        name: spotDetails.name,
        description: spotDetails.description,
        price: spotDetails.price,
        createdAt: spotDetails.createdAt,
        updatedAt: spotDetails.updatedAt,
        numReviews: reviewCount,
        avgStarRating: reviewCount > 0 ? parseFloat((totalStars / reviewCount).toFixed(1)) : null,
        SpotImages: spotDetails.SpotImages.map(img => ({ id: img.id, url: img.url, preview: img.preview })),
        Owner: spotDetails.Owner
    };

    res.status(200).json(responsePayload);
});

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const targetSpot = await Spot.findByPk(spotId);

    if (!targetSpot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });

    res.status(200).json({ Reviews: reviews });
});

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    try {
        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address, city, state, country, lat, lng, name, description, price
        });
        res.status(201).json(newSpot);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handleSequelizeError(error, res);
        }
        next(error);
    }
});

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const targetSpot = await Spot.findByPk(spotId);
    if (!targetSpot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({ where: { spotId, userId } });
    if (existingReview) {
        return res.status(500).json({ message: "User already has a review for this spot" });
    }

    const validationErrors = {};
    if (!review) validationErrors.review = "Review text is required";
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
        validationErrors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({ message: "Bad Request", errors: validationErrors });
    }

    const newReview = await Review.create({ spotId, userId, review, stars });
    res.status(201).json(newReview);
});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const currentUserId = req.user.id;

    const targetSpot = await Spot.findByPk(spotId);
    if (!targetSpot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (targetSpot.ownerId !== currentUserId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const newImage = await SpotImage.create({ spotId: targetSpot.id, url, preview });
    res.status(201).json({ id: newImage.id, url: newImage.url, preview: newImage.preview });
});

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const spotData = req.body;

    const targetSpot = await Spot.findByPk(spotId);
    if (!targetSpot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (targetSpot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await targetSpot.update(spotData);
        res.status(200).json(targetSpot);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return handleSequelizeError(error, res);
        }
        next(error);
    }
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const currentUserId = req.user.id;

    const targetSpot = await Spot.findByPk(spotId);
    if (!targetSpot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    
    if (targetSpot.ownerId !== currentUserId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    await targetSpot.destroy();
    res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;