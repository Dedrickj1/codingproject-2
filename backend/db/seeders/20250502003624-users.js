'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users'; // Specify the table name

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        username: 'john_doe',
        email: 'john@example.com',
        hashedPassword: 'hashed_password_1', // replace with hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        hashedPassword: 'hashed_password_2', // replace with hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        email: 'admin@example.com',
        hashedPassword: 'admin_hashed_password', // replace with hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      // You can add more users here
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['john_doe', 'jane_doe', 'admin'] }
    }, {});
  }
};
