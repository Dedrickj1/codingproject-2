const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');

const router = express.Router();

// DELETE /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { imageId } = req.params;

  try {
    // Find the SpotImage to verify ownership
    const imageToDelete = await SpotImage.findOne({
      where: { id: imageId },
      include: {
        model: Spot,
        attributes: ['ownerId']
      }
    });

    // return 404 if no image is found
    if (!imageToDelete) {
      return res.status(404).json({
        message: "Spot Image couldn't be found"
      });
    }

    // If current user doesn't own the spot, give forbidden message
    if (imageToDelete.Spot.ownerId !== userId) {
      return res.status(403).json({
        message: 'Forbidden: You do not have permission to delete this image'
      });
    }

    // Deletes the image
    await imageToDelete.destroy();

    return res.status(200).json({ message: 'Successfully deleted' });

  } catch (err) {
    // This handles unexpected errors
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  }
});

module.exports = router;