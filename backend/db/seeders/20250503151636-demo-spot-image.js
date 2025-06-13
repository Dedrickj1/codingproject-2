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
        url: 'https://images.pexels.com/photos/2403017/pexels-photo-2403017.jpeg',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/14036446/pexels-photo-14036446.jpeg',
        preview: true,

      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2024/05/24/15/52/wine-8785341_1280.jpg',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/14036443/pexels-photo-14036443.jpeg',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/11437918/pexels-photo-11437918.jpeg',
        preview: false,

      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/15796414/pexels-photo-15796414/free-photo-of-beach-restaurant-tropical-paradise-pool.jpeg',
        preview: false,

      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/4783558/pexels-photo-4783558.jpeg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/12336480/pexels-photo-12336480.jpeg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/15581834/pexels-photo-15581834/free-photo-of-aerial-shot-of-sea-and-city-waikiki-honolulu-hawai-usa.jpeg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/5006606/pexels-photo-5006606.jpeg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/4601405/pexels-photo-4601405.jpeg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/28408684/pexels-photo-28408684/free-photo-of-scenic-honolulu-skyline-from-diamond-head.jpeg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/4600754/pexels-photo-4600754.jpeg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/4602713/pexels-photo-4602713.jpeg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/4321418/pexels-photo-4321418.jpeg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/10514386/pexels-photo-10514386.jpeg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/4601064/pexels-photo-4601064.jpeg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/32224050/pexels-photo-32224050/free-photo-of-stunning-view-of-waikiki-beach-and-diamond-head.jpeg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/4321075/pexels-photo-4321075.jpeg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/4321101/pexels-photo-4321101.jpeg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/4321080/pexels-photo-4321080.jpeg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/4319892/pexels-photo-4319892.jpeg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/4601791/pexels-photo-4601791.jpeg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/4784701/pexels-photo-4784701.jpeg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/7502340/pexels-photo-7502340.jpeg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/5007422/pexels-photo-5007422.jpeg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/4783884/pexels-photo-4783884.jpeg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/5007250/pexels-photo-5007250.jpeg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/7498886/pexels-photo-7498886.jpeg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/9259637/pexels-photo-9259637.jpeg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/4319846/pexels-photo-4319846.jpeg',
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