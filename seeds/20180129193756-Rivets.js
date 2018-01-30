'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rivets',  //Notice the plural here
    [
      {
        name: 'Rivet #1',
        material: 'Bronze',
        shape: 'Round',
        size: '3cm',
        summary: 'Its bronze',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        name: 'Rivet #2',
        material: 'Gold',
        shape: 'Star',
        size: '4cm',
        summary: 'Its pricey',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rivets', null, {})
  }
};
