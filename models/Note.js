// models/Note.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;
