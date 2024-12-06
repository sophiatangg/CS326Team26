require('dotenv').config();

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: 'openinvite.db',
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
