'use strict';
const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "Gorgous views and super peaceful. Place was super clean too, had everything we needed really.",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "Cool spot but the place smelled a bit musty and the windows wouldn't open. Location was great though.",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 1,
        review: "Chill little cabin. Deer walked through the yard and stuff. Was dusty but not like terrible.",
        stars: 4,
      },
      {
        spotId: 5,
        userId: 3,
        review: "This place slappped! Cozy and clean and just trees for dayz. Comin back for sure.",
        stars: 5,
      },
      {
         spotId: 7,
        userId: 2,
        review: "Wasn't really worth it. Fireplace broke and street was loud all night. Town's cute tho.",
        stars: 2,
      },
      {
         spotId: 1,
        userId: 3,
        review: "2nd time here and still love it. Super chill and the stars at night was unreal. 10/10",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 3,
        review: "Wild place built in rocks. Bring your stuff tho, store was like 45 mins away lol.",
        stars: 4,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 5, 7] }
    }, {});
  }
};