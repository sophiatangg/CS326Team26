const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Event extends Model {
        static associate(models) {
            // Define associations here
            Event.belongsTo(models.User, { foreignKey: 'creator_id' });
        }
    }

    Event.init({
        username:{ type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        category: DataTypes.STRING,
        start_time:{ type: DataTypes.DATE, allowNull: false },
        end_time:{ type: DataTypes.DATE, allowNull: false },
        cover_image: DataTypes.STRING,
        location: { type: DataTypes.STRING, allowNull: false },

    }, {
        sequelize,
        modelName: 'Event',
    });

    return Event;
};
