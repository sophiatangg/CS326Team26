'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Events', 'username', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'default_user', // Add a default value to avoid the error
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Events', 'username');
    },
};
