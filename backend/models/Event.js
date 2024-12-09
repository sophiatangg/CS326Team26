const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Event extends Model {
        static associate(models) {
            // Define associations here
            Event.belongsTo(models.User, { foreignKey: 'creator_id' });
        }
    }

    Event.init({
        title: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        location: { type: DataTypes.STRING, allowNull: false },
        start_time: { type: DataTypes.DATE, allowNull: false },
        end_time: { type: DataTypes.DATE, allowNull: false },
        category: DataTypes.STRING,
        cover_image: DataTypes.STRING,
        creator_id: { type: DataTypes.INTEGER, allowNull: false },
    }, {
        sequelize,
        modelName: 'Event',
    });

    return Event;
};
