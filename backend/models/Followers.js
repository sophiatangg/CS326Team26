const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserFollowers = sequelize.define('UserFollowers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // Name of the table
            key: 'id',
        },
    },
    followerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // Name of the table
            key: 'id',
        },
    },
}, {
    timestamps: true, // Include createdAt and updatedAt
});

module.exports = UserFollowers;
