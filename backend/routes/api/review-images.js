const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, ReviewImage, Booking, Review, Spot, SpotImage } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { imageId } = req.params;

  try {
    const imageToDelete = await ReviewImage.findOne({
      where: { id: imageId },
      include: {
        model: Review,
        attributes: ['userId']
      }
    });

    if (!imageToDelete) {
      return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    const imageOwnerId = imageToDelete.Review.userId;

    if (imageOwnerId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this image' });
    }

    await imageToDelete.destroy();

    return res.status(200).json({ message: 'Successfully deleted' });

  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  }
});

module.exports = router;
