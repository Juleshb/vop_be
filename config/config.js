require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false  // Disable logging
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false  // Disable logging
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false  // Disable logging
  }
};
