'use strict';
const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      },
      {
        reviewId: 2,
        url: 'https://images.pexels.com/photos/11107306/pexels-photo-11107306.jpeg',
      },
      {
        reviewId: 3,
        url: 'https://images.pexels.com/photos/14036446/pexels-photo-14036446.jpeg',
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};