const { Sequelize } = require('sequelize');

// Create a Sequelize instance with SQLite configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
  logging: false, // Use false for no logging, or you can pass a function for custom logging
});

// Authenticate and check the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQLite database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
