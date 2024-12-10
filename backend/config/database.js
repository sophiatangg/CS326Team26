const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'sqlite',
    storage: 'openinvite.db',
});

module.exports = sequelize;
