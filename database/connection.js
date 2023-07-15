// database/connection.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notetaking', 'danidevcu', 'Kilo2022*', {
  host: 'db4free.net',
  dialect: 'mysql',
});

module.exports = sequelize;
