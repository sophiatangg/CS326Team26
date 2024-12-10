const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // Define associations here
            User.hasMany(models.Event, { foreignKey: 'creator_id' });
        }
    }

    User.init({
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        profile_picture: DataTypes.STRING,
        bio: DataTypes.TEXT,
        followers: { type: DataTypes.INTEGER, defaultValue: 0 },
        following: { type: DataTypes.INTEGER, defaultValue: 0 },
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};
