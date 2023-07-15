// database/connection.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notetaking', 'danidevcu', 'Kilo2022*', {
  host: 'db4free.net',
  dialect: 'mysql',
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();

module.exports = sequelize;
