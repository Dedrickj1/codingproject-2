'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'fakeuser@gmail.com',
        firstName: 'Andrea',
        lastName: 'Jones',
        username: 'A-Jones1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demouser2@gmail.com',
        firstName: 'Tommy',
        lastName: 'Oliver',
        username: 'GreenRanger2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'demouser3@gmail.com',
        firstName: 'Jason',
        lastName: 'Todd',
        username: 'NotRedHood3',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['A-Jones1', 'GreenRanger2', 'NotRedHood3'] }
    }, {});
  }
};