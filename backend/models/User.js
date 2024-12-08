const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            // checks Email format 
            isEmail: true,
         }
    },
        
    password: { 
        type: DataTypes.STRING, 
        allowNull: false },
    profile_picture: { 
        type: DataTypes.STRING,
        defaultValue: "",
     },
    bio: { 
        type: DataTypes.TEXT },
    followers: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 },
    following: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 },
    role: { 
        type: DataTypes.STRING, 
        defaultValue: "user" },
});

module.exports = User;
