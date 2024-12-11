module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Rsvp', [
          {
              rsvp_id: 'rsvp1',
              user_id: 1, // Assuming Alice's user_id is 1
              event_id: 1, // Assuming Hackathon's event_id is 1
              response: 'Yes',
              dietary_restrictions: JSON.stringify([{ type: 'Food', description: 'Vegetarian' }]),
              accessibility_needs: 'None',
              timestamp: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
          },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Rsvp', { rsvp_id: 'rsvp1' }, {});
  },
};
