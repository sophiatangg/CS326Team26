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
        desc: DataTypes.TEXT,
        category: DataTypes.STRING,
        date:{ type: DataTypes.DATE, allowNull: false },
        cover: DataTypes.STRING,
        time:{ type: DataTypes.STRING, allowNull: false },
        where: { type: DataTypes.STRING, allowNull: false },

    }, {
        sequelize,
        modelName: 'Event',
    });

    return Event;
};
