const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Rsvp extends Model {
        static associate(models) {
            // Define associations here
            Rsvp.belongsTo(models.Event, { foreignKey: 'event_id' });
            Rsvp.belongsTo(models.User, { foreignKey: 'username' });
        }
    }

    Rsvp.init({
        rsvp_id: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.STRING, allowNull: false },
        event_id: { type: DataTypes.STRING, allowNull: false },
        response: { type: DataTypes.STRING, allowNull: false, 
            validate: {
                isIn: [['yes', 'no', 'maybe']], // Ensures valid responses 
        },},
        dietary_restrictions: {type: DataTypes.JSON, allowNull: true, defaultValue: []},
        bio: DataTypes.TEXT,
        accessibility_needs: { type: DataTypes.TEXT, allowNull: true},
        timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,}
    }, {
        sequelize,
        modelName: 'Rsvp',
        freezeTableName: true
    });

    return Rsvp;
};
