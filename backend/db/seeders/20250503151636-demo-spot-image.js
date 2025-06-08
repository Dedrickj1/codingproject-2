'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg',
        preview: true,

      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/9149403/pexels-photo-9149403.jpeg',
        preview: false,

      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/5785076/pexels-photo-5785076.jpeg',
        preview: false,

      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/1724427/pexels-photo-1724427.jpeg',
        preview: false,

      },      
      {
        spotId: 1,
        url: 'https://www.pexels.com/photo/luxurious-overwater-bungalows-in-tropical-paradise-30037425/',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://www.pexels.com/photo/photo-of-beach-during-nighttime-1450361/',
        preview: true,

      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2024/05/24/15/52/wine-8785341_1280.jpg',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://www.pexels.com/photo/high-rise-buildings-near-the-ocean-7502485/',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://www.pexels.com/photo/aerial-view-of-city-buildings-near-body-of-water-4602255/',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://www.pexels.com/photo/city-buildings-and-sea-oahu-hawaii-usa-15989872/',
        preview: false,

      },
      {
        spotId: 3,
        url: 'https://www.pexels.com/photo/people-on-seashore-of-island-4783558/',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://www.pexels.com/photo/birds-eye-view-of-a-beach-in-honolulu-12336480/',
        preview: false,
      },
      {
        spotId: 3,
        url: '',
        preview: false,
      },
      {
        spotId: 3,
        url: '',
        preview: false,
      },
      {
        spotId: 3,
        url: '',
        preview: false,
      },
      {
        spotId: 4,
        url: '',
        preview: true,
      },
      {
        spotId: 4,
        url: '',
        preview: false,
      },
      {
        spotId: 4,
        url: '',
        preview: false,
      },
      {
        spotId: 4,
        url: '',
        preview: false,
      },
      {
        spotId: 4,
        url: '',
        preview: false,
      },
      {
        spotId: 5,
        url: '',
        preview: true,
      },
      {
        spotId: 5,
        url: '',
        preview: false,
      },
      {
        spotId: 5,
        url: '',
        preview: false,
      },
      {
        spotId: 5,
        url: '',
        preview: false,
      },
      {
        spotId: 5,
        url: '',
        preview: false,
      },
      {
        spotId: 6,
        url: '',
        preview: true,
      },
      {
        spotId: 6,
        url: '',
        preview: false,
      },
      {
        spotId: 6,
        url: '',
        preview: false,
      },
      {
        spotId: 6,
        url: '',
        preview: false,
      },
      {
        spotId: 6,
        url: '',
        preview: false,
      },
      {
        spotId: 7,
        url: '',
        preview: true,
      },
      {
        spotId: 7,
        url: '',
        preview: false,
      },
      {
        spotId: 7,
        url: '',
        preview: false,
      },
      {
        spotId: 7,
        url: '',
        preview: false,
      },
      {
        spotId: 7,
        url: '',
        preview: false,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};