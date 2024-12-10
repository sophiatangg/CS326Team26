const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
    const UserFollowers = sequelize.define('UserFollowers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Ensure this matches the table name of your `User` model
                key: 'id',
            },
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Ensure this matches the table name of your `User` model
                key: 'id',
            },
        },
    }, {
        timestamps: true, // Include createdAt and updatedAt
    });

    return UserFollowers;
};
