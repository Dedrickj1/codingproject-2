'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-12-25',
        endDate: '2024-01-01',
     
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2020-10-23',
        endDate: '2020-10-30',
       
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2028-04-12',
        endDate: '2028-04-13',
       
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};