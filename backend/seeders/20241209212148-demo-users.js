module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
          { username: 'Alice', email: 'alice@example.com', password: 'hashedpassword', createdAt: new Date(), updatedAt: new Date() },
          { username: 'Bob', email: 'bob@example.com', password: 'hashedpassword', createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
  },
};
