const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserFollowers = require('./Followers'); // Import UserFollowers table



const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
            isEmail: { 
                msg: 'Must be a valid email address' 
            },
         }
    },
        
    password: { 
        type: DataTypes.STRING, 
        allowNull: false },
    profile_picture: { 
        type: DataTypes.STRING,
        allowNull: true,
     },
    bio: { 
        type: DataTypes.TEXT 
    },
    picturename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    mime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
);

/*
Finding "followers" in openonvite.db (users who follow a specific user):
Use the foreignKey: 'userId'.
Look for rows in UserFollowers where userId = the target user's ID.


Finding "following" in openonvite.db (users a specific user follows):
Use the foreignKey: 'followerId'.
Look for rows in UserFollowers where followerId = the target user's ID.
*/
// user can follow and be followed by other users.
User.belongsToMany(User, {
    // Alias for how the follower relationship is referenced in application.
    as: 'Followers', 
    // Join table
    through: UserFollowers, 
    // Specifies the "followee"
    foreignKey: 'userId', 
    // Specifies the "Follower"
    otherKey: 'followerId', 
});

User.belongsToMany(User, {
    // alias for how the following relationship is referenced in application.
    as: 'Following', 
    //  join table that stores the connections between followers and those being followed.
    through: UserFollowers, 
    //In the UserFollowers table, links to the primary key (id) of the User model.
    // Specifies the "follower"
    foreignKey: 'followerId',
    // Specifies the "followee"
    otherKey: 'userId', 
});

    return User;
};
