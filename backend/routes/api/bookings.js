const express = require('express');
const bcrypt = require('bcryptjs'); 

const { check } = require('express-validator'); 
const { handleValidationErrors } = require('../../utils/validation'); 

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, ReviewImage, Booking, Review, Spot, SpotImage } = require('../../db/models');
const {Op} = require('sequelize')

const router = express.Router();

router.get('/current', requireAuth, async(req, res, next) => {
        const userId = req.user.id
        const bookings = await Booking.findAll({
            where: {userId: userId},
            include:[{
                model: Spot,
                attributes: [
                    'id', 
                    'ownerId', 
                    'address',
                    'city',
                    'state', 
                    'country', 
                    'lat',
                    'lng', 
                    'name',
                    'price', 
                ],
                include:[{
                    model: SpotImage,
                    attributes: [ 'url', 'preview']
                }] 
            }
        ]
        })
        let bookingsList = [];

        bookings.forEach((booking) => {
            const bookingJSON = booking.toJSON();
    
            bookingJSON.Spot.SpotImages.forEach((image) => {
                if (image.preview === true) {
                    bookingJSON.Spot.previewImage = image.url;
                }
            });
    
            if (!bookingJSON.Spot.previewImage) {
                bookingJSON.Spot.previewImage = 'No preview image available';
            }
    
            delete bookingJSON.Spot.SpotImages;
    
        const formattedBooking = {
            id: bookingJSON.id,
            spotId: bookingJSON.spotId,
            Spot: {
                id: bookingJSON.Spot.id,
                ownerId: bookingJSON.Spot.ownerId,
                address: bookingJSON.Spot.address,
                city: bookingJSON.Spot.city,
                state: bookingJSON.Spot.state,
                country: bookingJSON.Spot.country,
                lat: bookingJSON.Spot.lat,
                lng: bookingJSON.Spot.lng,
                name: bookingJSON.Spot.name,
                price: bookingJSON.Spot.price,
                previewImage: bookingJSON.Spot.previewImage
            },
            userId: bookingJSON.userId,
            startDate: bookingJSON.startDate.toISOString().split('T')[0],
            endDate: bookingJSON.endDate.toISOString().split('T')[0],
            createdAt: bookingJSON.createdAt,
            updatedAt: bookingJSON.updatedAt
        };

        bookingsList.push(formattedBooking);
        });
    
        res.status(200).json({ Bookings: bookingsList });
})


router.put('/:bookingId', requireAuth, async (req, res)=>{
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    try {
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking couldn't be found"
            });
        }

        // Make sure the booking was made by the current user
        if (booking.userId !== userId) {
            return res.status(403).json({
                message: 'Forbidden: You do not have permission to edit this booking'
            });
        }

       
        const today = new Date();

    
        if (new Date(startDate) < today && new Date(endDate) < today) {
            return res.status(403).json({
                message: "Past bookings can't be modified"
            });
        }

        
        const errors = {};

        if (new Date(startDate) < today) {
            errors.startDate = "startDate cannot be in the past";
        }
        if (new Date(endDate) <= new Date(startDate)) {
            errors.endDate = "endDate cannot be on or before startDate";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: "Bad Request",
                errors
            });
        }

        // Check for bookings errors
        const conflictingBookings = await Booking.findAll({
            where: {
                spotId: booking.spotId,
                id: { [Op.ne]: booking.id }, 
                [Op.or]: [
                    {
                        startDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        endDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        [Op.and]: [
                            { startDate: { [Op.lte]: startDate } },
                            { endDate: { [Op.gte]: endDate } }
                        ]
                    }
                ]
            }
        });

        if (conflictingBookings.length > 0) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for those dates. PLease try again.",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }

        // This is where you can update the booking
        await booking.update({
            startDate,
            endDate
        });

        // Make sure the dates are formatted correctly before sending request
        const updatedBooking = booking.toJSON();
        updatedBooking.startDate = updatedBooking.startDate.toISOString().split('T')[0];
        updatedBooking.endDate = updatedBooking.endDate.toISOString().split('T')[0];

        res.status(200).json(updatedBooking);

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
})

// This will delete the bookings
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const userId = req.user.id;

    try {
        const booking = await Booking.findOne({
            where: { id: bookingId },
            include: {
                model: Spot,
                attributes: ['ownerId'] 
            }
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }

        if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const today = new Date();
        if (new Date(booking.startDate) <= today) {
            return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
        }

        await booking.destroy();

        return res.status(200).json({ message: "Successfully deleted" });

    } catch (err) {
        return res.status(500).json({
            message: "Did not delete booking",
            error: err.message
        });
    }
});

module.exports = router;