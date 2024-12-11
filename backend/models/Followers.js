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
                model: 'Users', 
                key: 'id',
            },
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id',
            },
        },
    }, {
        timestamps: true, // Include createdAt and updatedAt
    });

    // Define associations
    UserFollowers.associate = (models) => {
        // Association for the followee
        UserFollowers.belongsTo(models.User, {
            as: 'User', // Alias for the user being followed
            foreignKey: 'userId',
        });

        // Association for the follower
        UserFollowers.belongsTo(models.User, {
            as: 'Follower', // Alias for the follower
            foreignKey: 'followerId',
        });
    };

    return UserFollowers;
};
