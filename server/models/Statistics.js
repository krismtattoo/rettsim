const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Statistics = sequelize.define('Statistics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.JSON,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  period: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
    defaultValue: 'daily'
  }
});

module.exports = Statistics; 