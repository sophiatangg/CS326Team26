module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Events', [
          { title: 'Hackathon', description: 'A coding competition', location: 'Room 101', start_time: new Date(), end_time: new Date(), category: 'Technology', creator_id: 1, createdAt: new Date(), updatedAt: new Date() },
          { title: 'Music Fest', description: 'An outdoor music event', location: 'Park', start_time: new Date(), end_time: new Date(), category: 'Music', creator_id: 2, createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Events', null, {});
  },
};
