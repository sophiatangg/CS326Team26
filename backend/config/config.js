require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'openinvite.db', // SQLite database file
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: 'openinvite.db',
  },
};
