const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profile_picture: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    followers: { type: DataTypes.INTEGER, defaultValue: 0 },
    following: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = User;
