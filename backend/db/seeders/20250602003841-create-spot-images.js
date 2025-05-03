// backend/db/seeders/YYYYMMDDHHMMSS-create-spot-images.js
'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages'; // Table name "SpotImages"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1, // Reference to spot ID (adjust as needed)
        url: 'https://example.com/images/cozy-cottage1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1, // Reference to spot ID (adjust as needed)
        url: 'https://example.com/images/cozy-cottage2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2, // Reference to spot ID (adjust as needed)
        url: 'https://example.com/images/urban-loft1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3, // Reference to spot ID (adjust as needed)
        url: 'https://example.com/images/beachfront-villa1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://example.com/images/cozy-cottage1.jpg',
        'https://example.com/images/cozy-cottage2.jpg',
        'https://example.com/images/urban-loft1.jpg',
        'https://example.com/images/beachfront-villa1.jpg'
      ] }
    }, {});
  }
};
