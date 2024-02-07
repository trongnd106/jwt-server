'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('User', [
      {
        email: 'John Doe1',
        username: 'fake11',
        password: '123'
      },
      {
        email: 'John Doe2',
        username: 'fake12',
        password: '123'
      },
      {
        email: 'John Doe3',
        username: 'fake13',
        password: '123'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
