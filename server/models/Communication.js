const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Communication = sequelize.define('Communication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  type: {
    type: DataTypes.ENUM('text', 'status_update', 'alert'),
    defaultValue: 'text'
  },
  priority: {
    type: DataTypes.ENUM('normal', 'urgent', 'emergency'),
    defaultValue: 'normal'
  }
});

module.exports = Communication; 