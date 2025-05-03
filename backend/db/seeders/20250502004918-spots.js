'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1, // Assuming user with id 1 is the owner
        name: 'Cozy Cabin',
        description: 'A warm and welcoming cabin in the mountains.',
        address: '123 Mountain Road, Hilltop',
        city: 'Mountain City',
        state: 'MT',
        country: 'Countryland',
        lat: 45.12345,
        lng: -110.98765,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 2, // Assuming user with id 2 is the owner
        name: 'Oceanfront Villa',
        description: 'A beautiful villa overlooking the beach.',
        address: '456 Ocean Blvd, Seaside',
        city: 'Seaside Town',
        state: 'CA',
        country: 'Countryland',
        lat: 36.98765,
        lng: -123.45678,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more spots as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Cozy Cabin', 'Oceanfront Villa'] }
    }, {});
  }
};
