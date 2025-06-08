'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "1007 Mountain Drive",
        city: "Gotham",
        state: "New Jersey",
        country: "USA",
        lat: 72.87284,
        lng: -32.90873,
        name: "BatCave",
        description: "Dark and mysterious manor owned by billionare playboy Bruce Wayne ",
        price: 25000
      },
      {
        ownerId: 2,
        address: "139 Kane Street",
        city: "Gotham",
        state: "New Jersey",
        country: "USA",
        lat: 4.73117,
        lng: 81.14067,
        name: "Wayne Tower",
        description: "Rent a room inside wayne Tower and Come See the daily operations of wayne tech by coming to wayne tower. HQ of Wayne enterprise.",
        price: 1000000
      },
      {
        ownerId: 3,
        address: "5th Avenue and Central Park South",
        city: "New York",
        state: "New York",
        country: "USA",
        lat: 49.19525,
        lng: -108.51744,
        name: "The Plaza, New York city ",
        description: "Want to see what New York has to offer? the come on down to The Plaza, where the party never stops.",
        price: 7000
      },
      {
       ownerId: 1,
        address: "302 Indigo Basin Court",
        city: "Mesa Verde",
        state: "Utah",
        country: "USA",
        lat: 37.2302,
        lng: -109.9967,
        name: "Indigo Basin Camphouse",
        description: "A sandstone getaway built into the landscape — perfect for stargazing and hiking red rock canyons.",
        price: 144

      },
      {
         ownerId: 2,
        address: "76 Harborwind Lane",
        city: "Claremont Shores",
        state: "Rhode Island",
        country: "USA",
        lat: 41.5528,
        lng: -71.2943,
        name: "The Lighthouse Loft",
        description: "A bright and airy top-floor flat in a converted lighthouse keeper's house, just minutes from the marina.",
        price: 212
      },
      {
        ownerId: 3,
        address: "590 Driftstone Walk",
        city: "Windmere",
        state: "North Carolina",
        country: "USA",
        lat: 35.2254,
        lng: -80.8278,
        name: "Windmere Waterside",
        description: "This peaceful home backs up to a private creek and includes a firepit, canoe dock, and screened breakfast patio.",
        price: 175
      },
      {
       ownerId: 2,
        address: "15 Alder Row",
        city: "Silverhill",
        state: "Oregon",
        country: "USA",
        lat: 44.2371,
        lng: -123.1125,
        name: "Silverhill A-Frame",
        description: "This wood-and-glass A-frame is secluded, quiet, and fully surrounded by trees. Watch the rain from inside.",
        price: 187

      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};