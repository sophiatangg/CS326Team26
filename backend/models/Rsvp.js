const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Rsvp extends Model {
        static associate(models) {
            // Define associations here
            User.belongsTo(models.Event, { foreignKey: 'event_id' });
            User.belongsTo(models.User, { foreignKey: 'username' });
        }
    }

    Rsvp.init({
        rsvp_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true},
        user_id: { type: DataTypes.STRING, allowNull: false },
        event_id: { type: DataTypes.STRING, allowNull: false },
        response: { type: DataTypes.STRING, allowNull: false, 
            validate: {
                isIn: [['Yes', 'No', 'Maybe']], // Ensures valid responses 
        },},
        dietary_restrictions: {type: DataTypes.JSON, allowNull: true, defaultValue: []},
        bio: DataTypes.TEXT,
        accessibility_needs: { type: DataTypes.TEXT, allowNull: true},
        timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,}
    }, {
        sequelize,
        modelName: 'Rsvp',
    });

    return Rsvp;
};
