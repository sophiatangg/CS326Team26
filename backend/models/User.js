module.exports = (sequelize, DataTypes) => {
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
                isEmail: {
                    msg: 'Must be a valid email address',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.TEXT,
        },
    });

    const UserFollowers = require('./Followers')(sequelize, DataTypes); // Import UserFollowers

    // Define followers association
    User.belongsToMany(User, {
        as: 'Followers',
        through: UserFollowers,
        foreignKey: 'userId', // The key on the UserFollowers table representing the followed user
        otherKey: 'followerId', // The key on the UserFollowers table representing the follower
    });

    // Define following association
    User.belongsToMany(User, {
        as: 'Following',
        through: UserFollowers,
        foreignKey: 'followerId', // The key on the UserFollowers table representing the follower
        otherKey: 'userId', // The key on the UserFollowers table representing the followed user
    });

    return User;
};
