'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define schema in production
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        address: '123 Main St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Beautiful Loft',
        description: 'A cozy loft in the heart of the city.',
        price: 150.00,
        ownerId: 1,   // make sure this ownerId exists in your Users table!
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: '456 Maple Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Modern Apartment',
        description: 'A modern apartment near Central Park.',
        price: 200.00,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Beautiful Loft', 'Modern Apartment'] }
    }, {});
  }
};
